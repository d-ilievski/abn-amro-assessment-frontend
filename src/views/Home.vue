<template>
  <div class="home">
    <transition name="open">
      <RecipeDetails v-if="this.$route.meta.details" :recipe="viewRecipe" />
    </transition>
    <Navbar :loading="recipesLoading" :recipe="viewRecipe" />
    <div class="content" :class="{ open: this.$route.meta.details }">
      <RecipesList
        :recipes="recipes"
        :loading="recipesLoading"
        :queryOptions="this.queryOptions"
      />
    </div>
    <!-- Modals & Dialogs -->
    <AddEditRecipeModal
      :recipe="workRecipe"
      :show="showAddEditRecipeModal"
      :editing="editingRecipe"
      @close="closeAddEditRecipeModal"
      @submit="submitRecipe"
      @choosePhoto="photo => (this.photoFile = photo)"
    />

    <vConfirmDialog
      :show="deletingRecipe"
      :title="'Delete Recipe'"
      :confirmButton="'Yes, delete!'"
      :declineButton="'Cancel'"
      :danger="true"
      @cancel="deletingRecipe = false"
      @confirm="deleteRecipe"
    >
      <div>
        Do you really want to delete the recipe?
        <div>-</div>
        <span class="text-danger"
          ><strong>This action is irreversible.</strong></span
        >
      </div>
    </vConfirmDialog>
  </div>
</template>

<script>
import RecipesList from "@/components/RecipeList/RecipesList.vue";
import RecipeDetails from "@/components/RecipeDetails.vue";
import Navbar from "@/components/Navbar.vue";
import AddEditRecipeModal from "@/components/AddEditRecipeModal.vue";
import vConfirmDialog from "@/components/vConfirmDialog.vue";
import { RecipeActions } from "@/utils/constants";
import RecipesRepository from "@/api/RecipesRepository";
import FilesRepository from "@/api/FilesRepository";
import router from "@/router/index";

export default {
  name: "Home",
  router,
  components: {
    RecipesList,
    RecipeDetails,
    Navbar,
    AddEditRecipeModal,
    vConfirmDialog
  },
  data: () => {
    return {
      workRecipe: {},
      viewRecipe: {},
      photoFile: null,
      recipes: [],
      queryOptions: {
        page: 0,
        searchTerm: "",
        totalElements: 0,
        totalPages: 0
      },
      recipesLoading: false,
      showAddEditRecipeModal: false,
      deletingRecipe: false,
      editingRecipe: false
    };
  },
  methods: {
    resetWorkRecipe() {
      this.workRecipe = {
        id: null,
        vegetarian: false,
        ingredients: [],
        name: "",
        instructions: "",
        servings: null
      };
      this.editingRecipe = false;
      this.photoFile = null;
    },
    searchRecipes(searchTerm) {
      this.$data.recipesLoading = true;
      RecipesRepository.list(searchTerm, this.queryOptions.page).then(
        result => {
          this.recipes = result.data.content;
          this.queryOptions.totalElements = result.data.totalElements;
          this.queryOptions.totalPages = result.data.totalPages;
          this.$data.recipesLoading = false;
        }
      );
    },
    closeAddEditRecipeModal() {
      this.$data.showAddEditRecipeModal = false;
      this.resetWorkRecipe();
    },
    submitRecipe() {
      // deep copy
      let recipe = JSON.parse(JSON.stringify(this.workRecipe));
      // prepare for saving
      recipe.ingredients = JSON.stringify(this.workRecipe.ingredients);

      this.$data.showAddEditRecipeModal = false;

      if (this.editingRecipe) {
        recipe.updatedOn = Date.now();
        this.updateRecipe(recipe);
      } else {
        this.workRecipe.createdOn = Date.now();
        this.createRecipe(recipe);
      }
    },
    createRecipe(recipe) {
      if (recipe) {
        RecipesRepository.create(recipe).then(result => {
          let reducedRecipe = {
            id: result.data.id,
            name: result.data.name,
            servings: result.data.servings,
            vegetarian: result.data.vegetarian
          };
          this.recipes.push(reducedRecipe);

          // increase No. recipes
          this.queryOptions.totalElements++;

          if (this.photoFile) {
            FilesRepository.uploadRecipePhoto(this.photoFile, result.data.id);
          }

          this.closeAddEditRecipeModal();
        });
      }
    },
    updateRecipe(recipe) {
      if (recipe) {
        RecipesRepository.update(recipe).then(result => {
          // update display on frontend if editing the same recipe
          let data = result.data;

          if (this.photoFile) {
            FilesRepository.uploadRecipePhoto(this.photoFile, recipe.id).then(
              () => {
                if (data.id === this.viewRecipe.id) {
                  this.viewRecipe = data;
                  this.viewRecipe.ingredients = JSON.parse(data.ingredients);
                  this.viewRecipe.hasImage = true;
                }
              }
            );
          } else {
            if (data.id === this.viewRecipe.id) {
              this.viewRecipe = data;
              this.viewRecipe.ingredients = JSON.parse(data.ingredients);
            }
          }

          // update list locally
          let index = this.recipes.findIndex(
            recipe => recipe.id === result.data.id
          );
          this.recipes[index].name = result.data.name;
          this.recipes[index].vegetarian = result.data.vegetarian;
          this.recipes[index].servings = result.data.servings;

          this.closeAddEditRecipeModal();
        });
      }
    },
    getRecipeById(id) {
      return RecipesRepository.get(id)
        .then(result => {
          if (result.data == "")
            this.$router.push({
              name: "home"
            });

          // parse ingredients
          let data = { ...result.data };
          if (data.ingredients)
            data.ingredients = JSON.parse(result.data.ingredients);
          else data.ingredients = [];

          return data;
        })
        .catch(() => {
          this.$router.push({
            name: "home"
          });
        });
    },
    deleteRecipe() {
      RecipesRepository.delete(this.viewRecipe.id).then(() => {
        // update locally
        let index = this.recipes.findIndex(
          recipe => recipe.id === this.viewRecipe.id
        );
        this.recipes.splice(index, 1);

        // No. results - 1
        if (this.queryOptions.totalElements) this.queryOptions.totalElements--;

        this.deletingRecipe = false;
        this.$router.push({
          name: "home"
        });
      });
    }
  },
  created() {
    // initial fetch of recipes
    this.searchRecipes();

    // if direct access from /recipes/:id
    if (this.$route.params.id && !this.viewRecipe.id) {
      this.getRecipeById(this.$route.params.id).then(recipe => {
        this.viewRecipe = recipe;
      })
      .catch(() => {
        this.router.push({name: 'home'});
      });
    }

    // Pub Sub
    this.$eventBus.$on(RecipeActions.ViewRecipe, recipe => {
      this.getRecipeById(recipe.id).then(recipe => {
        this.viewRecipe = recipe;
      });
    });

    this.$eventBus.$on(RecipeActions.SearchRecipes, (searchTerm, page = 0) => {
      this.queryOptions.searchTerm = searchTerm;
      this.queryOptions.page = page;

      this.searchRecipes(searchTerm);
    });

    this.$eventBus.$on(RecipeActions.AddRecipe, () => {
      this.resetWorkRecipe();
      this.$data.showAddEditRecipeModal = true;
    });

    this.$eventBus.$on(RecipeActions.EditRecipe, recipe => {
      this.editingRecipe = true;

      // already fetched
      if (recipe.id === this.viewRecipe.id) {
        this.$data.workRecipe = JSON.parse(JSON.stringify(this.viewRecipe));
        this.$data.showAddEditRecipeModal = true;
      }
      // fetch then set
      else {
        this.getRecipeById(recipe.id).then(result => {
          this.workRecipe = result;
          this.$data.showAddEditRecipeModal = true;
        });
      }
    });

    this.$eventBus.$on(RecipeActions.DeleteRecipe, () => {
      // this.$emit(recipe)
      this.$data.deletingRecipe = true;
    });
  },
  destroyed() {
    this.$eventBus.$off(RecipeActions.ViewRecipe);
    this.$eventBus.$off(RecipeActions.SearchRecipes);
    this.$eventBus.$off(RecipeActions.EditRecipe);
    this.$eventBus.$off(RecipeActions.AddRecipe);
    this.$eventBus.$off(RecipeActions.DeleteRecipe);
  }
};
</script>

<style scoped>
.content {
  margin-top: 50px;
  transition: all 0.2s ease-in;
  padding: 20px 50px;
}
.content.open {
  margin-left: 600px;
}

.open-enter-active {
  animation: drawer 0.25s ease-in-out;
}
.open-leave-active {
  animation: drawer 0.25s reverse ease-in-out;
}
@keyframes drawer {
  0% {
    left: -100%;
  }
  100% {
    left: 0;
  }
}

/* Media Queries */
@media screen and (max-width: 991px) {
  .content.open {
    margin-left: 0;
  }

  .content {
    padding: 20px 10px;
  }
}
</style>
