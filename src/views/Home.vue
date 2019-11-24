<template>
  <div class="home">
    <transition name="open">
      <RecipeDetails v-if="this.$route.meta.details" :recipe="viewRecipe" />
    </transition>
    <Navbar :loading="recipesLoading" :recipe="viewRecipe" />
    <div class="content" :class="{ open: this.$route.meta.details }">
      <RecipesList :recipes="recipes" :loading="recipesLoading" />
    </div>
    <!-- Modals & Dialogs -->
    <AddEditRecipeModal
      :recipe="workRecipe"
      :show="showAddEditRecipeModal"
      :editing="editingRecipe"
      @close="closeAddEditRecipeModal"
      @submit="submitRecipe"
    />

    <vConfirmDialog
      :show="deletingRecipe"
      :title="'Delete Recipe'"
      :confirmButton="'Yes, delete!'"
      :declineButton="'Cancel'"
      :danger="true"
      @close="deletingRecipe = false"
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

export default {
  name: "Home",
  components: {
    RecipesList,
    RecipeDetails,
    Navbar,
    AddEditRecipeModal,
    vConfirmDialog
  },
  data: () => {
    return {
      workRecipe: {
        id: 0,
        vegetarian: false,
        ingredients: [],
        name: "",
        instructions: "",
        servings: 0
      },
      viewRecipe: {},
      recipes: [
        {
          id: 1,
          name: "Pancakes",
          vegetarian: true,
          servings: 1
        },
        {
          id: 2,
          name: "Pizza",
          vegetarian: false,
          servings: 2
        },
        {
          id: 3,
          name: "Coke",
          vegetarian: true,
          servings: 3
        },
        {
          id: 4,
          name: "Pasta Carbonara",
          vegetarian: false,
          servings: 4
        },
        {
          id: 5,
          name: "Tavche Gravche",
          vegetarian: true,
          servings: 2
        },
        {
          id: 6,
          name: "Pancakes",
          vegetarian: true,
          servings: 1
        },
        {
          id: 7,
          name: "Pizza",
          vegetarian: false,
          servings: 2
        },
        {
          id: 8,
          name: "Coke",
          vegetarian: true,
          servings: 3
        },
        {
          id: 9,
          name: "Pasta Carbonara",
          vegetarian: false,
          servings: 4
        },
        {
          id: 10,
          name: "Tavche Gravche",
          vegetarian: true,
          servings: 2
        }
      ],
      recipesLoading: false,
      showAddEditRecipeModal: false,
      deletingRecipe: false,
      editingRecipe: false
    };
  },
  methods: {
    resetWorkRecipe() {
      this.workRecipe = {
        id: 0,
        vegetarian: false,
        ingredients: [],
        name: "",
        instructions: "",
        servings: 0
      };
      this.editingRecipe = false;
    },
    searchRecipes(searchTerm) {
      this.$data.recipesLoading = true;
      setTimeout(() => {
        this.$data.recipesLoading = false;
        this.$emit(searchTerm);
      }, 3000);
    },
    closeAddEditRecipeModal() {
      this.$data.showAddEditRecipeModal = false;
      this.resetWorkRecipe();
    },
    submitRecipe() {
      if (this.editingRecipe) {
        this.workRecipe.updatedOn = Date.now();
        this.workRecipe.ingredients = JSON.stringify(
          this.workRecipe.ingredients
        );
        RecipesRepository.update(this.workRecipe).then(result => {
          // update display on frontend if editing the same recipe
          if (result.data.id === this.viewRecipe.id) {
            this.viewRecipe = result.data;
          }
          this.closeAddEditRecipeModal();
        });
      } else {
        this.workRecipe.createdOn = Date.now();
        RecipesRepository.create(this.workRecipe).then(() => {
          this.closeAddEditRecipeModal();
        });
      }
    },
    getRecipeById(id) {
      return RecipesRepository.get(id).then(result => {
        // parse ingredients
        let data = {...result.data};
        if (data.ingredients)
          data.ingredients = JSON.parse(result.data.ingredients);
        else data.ingredients = [];

        return data;
      });
    }
  },
  created() {
    // if direct access from /recipes/:id
    if (this.$route.params.id && !this.viewRecipe.id) {
      this.getRecipeById(this.$route.params.id).then(recipe => {
        this.viewRecipe = recipe;
      });
    }

    // Pub Sub

    this.$eventBus.$on(RecipeActions.ViewRecipe, recipe => {
      this.getRecipeById(recipe.id).then(recipe => {
        
        this.viewRecipe = recipe;
      });
    });

    this.$eventBus.$on(RecipeActions.SearchRecipes, searchTerm => {
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
        this.$data.workRecipe = { ...this.viewRecipe };
        this.$data.showAddEditRecipeModal = true;
      }
      // fetch then set
      else {
        this.getRecipeById(recipe.id).then(result => {
          this.$data.workRecipe = result.data;
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
