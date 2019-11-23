<template>
  <div class="home">
    <transition name="open">
      <RecipeDetails v-if="this.$route.meta.details" :recipe="currentRecipe" />
    </transition>
    <Navbar :loading="recipesLoading" />
    <div class="content" :class="{ open: this.$route.meta.details }">
      <RecipesList :recipes="recipes" :loading="recipesLoading" />
    </div>
    <!-- Modals & Dialogs -->
    <vModal :show="showAddEditRecipeDialog" @close="closeAddEditRecipeDialog" />

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
        <span class="text-danger"><strong>This action is irreversible.</strong></span>
      </div>
    </vConfirmDialog>
  </div>
</template>

<script>
import RecipesList from "@/components/RecipeList/RecipesList.vue";
import RecipeDetails from "@/components/RecipeDetails.vue";
import Navbar from "@/components/Navbar.vue";
import vModal from "@/components/vModal.vue";
import vConfirmDialog from "@/components/vConfirmDialog.vue";
import { RecipeActions } from "@/utils/constants";

export default {
  name: "Home",
  components: {
    RecipesList,
    RecipeDetails,
    Navbar,
    vModal,
    vConfirmDialog
  },
  data: () => {
    return {
      currentRecipe: {
        id: 1,
        name: "Alfredo Sauce",
        isVegetarian: true,
        servings: 1,
        createdOn: Date.now(),
        ingredients: ["100g Oriz", "5g Brashno", "1kg Pileshko Meso"],
        instructions:
          '<!-- #######  YAY, I AM THE SOURCE EDITOR! #########--><h1 style="color: #5e9ca0;">You can edit <span style="color: #2b2301;">this demo</span> text!</h1><h2 style="color: #2e6c80;">How to use the editor:</h2>'
      },
      recipes: [
        {
          id: 1,
          name: "Pancakes",
          isVegetarian: true,
          servings: 1
        },
        {
          id: 2,
          name: "Pizza",
          isVegetarian: false,
          servings: 2
        },
        {
          id: 3,
          name: "Coke",
          isVegetarian: true,
          servings: 3
        },
        {
          id: 4,
          name: "Pasta Carbonara",
          isVegetarian: false,
          servings: 4
        },
        {
          id: 5,
          name: "Tavche Gravche",
          isVegetarian: true,
          servings: 2
        },
        {
          id: 6,
          name: "Pancakes",
          isVegetarian: true,
          servings: 1
        },
        {
          id: 7,
          name: "Pizza",
          isVegetarian: false,
          servings: 2
        },
        {
          id: 8,
          name: "Coke",
          isVegetarian: true,
          servings: 3
        },
        {
          id: 9,
          name: "Pasta Carbonara",
          isVegetarian: false,
          servings: 4
        },
        {
          id: 10,
          name: "Tavche Gravche",
          isVegetarian: true,
          servings: 2
        }
      ],
      recipesLoading: false,
      showAddEditRecipeDialog: false,
      deletingRecipe: false
    };
  },
  methods: {
    setCurrentRecipe(recipe) {
      this.currentRecipe = recipe;
    },

    searchRecipes(searchTerm) {
      this.$data.recipesLoading = true;
      setTimeout(() => {
        this.$data.recipesLoading = false;
        this.$emit(searchTerm);
      }, 3000);
    },
    closeAddEditRecipeDialog() {
      this.$data.showAddEditRecipeDialog = false;
      // reset
    }
  },
  created() {
    // Pub Sub

    this.$eventBus.$on(RecipeActions.FetchRecipe, recipe => {
      this.setCurrentRecipe(recipe);
    });

    this.$eventBus.$on(RecipeActions.SearchRecipes, searchTerm => {
      this.searchRecipes(searchTerm);
    });

    this.$eventBus.$on(RecipeActions.AddRecipe, () => {
      this.$data.showAddEditRecipeDialog = true;
    });

    this.$eventBus.$on(RecipeActions.EditRecipe, () => {
      // this.$emit(recipe)
      this.$data.showAddEditRecipeDialog = true;
    });

    this.$eventBus.$on(RecipeActions.DeleteRecipe, () => {
      // this.$emit(recipe)
      this.$data.deletingRecipe = true;
    });
  },
  destroyed() {
    this.$eventBus.$off(RecipeActions.FetchRecipe);
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
