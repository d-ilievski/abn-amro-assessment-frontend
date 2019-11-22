<template>
  <div class="home">
    <transition name="open">
      <RecipeDetails v-if="this.$route.meta.details" :recipe="currentRecipe" />
    </transition>
    <Navbar />
    <div class="content" :class="{ open: this.$route.meta.details }">
      <RecipesList :recipes="recipes" />
    </div>
  </div>
</template>

<script>
import RecipesList from "@/components/RecipeList/RecipesList.vue";
import RecipeDetails from "@/components/RecipeDetails.vue";
import Navbar from "@/components/Navbar.vue";
import { FetchRecipe } from "@/utils/constants";

export default {
  name: "Home",
  components: {
    RecipesList,
    RecipeDetails,
    Navbar
  },
  data: () => {
    return {
      currentRecipe: {
        id: 1,
        name: "Alfredo Sauce",
        isVegetarian: true,
        servings: 1
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
        }
      ]
    };
  },
  methods: {
    setCurrentRecipe(recipe) {
      this.currentRecipe = recipe;
    }
  },
  created() {
    this.$eventBus.$on(FetchRecipe, recipe => {
      this.setCurrentRecipe(recipe);
    });
  },
  destroyed() {
    this.$eventBus.$off(FetchRecipe);
  }
};
</script>

<style scoped>
.content {
  margin-top: 48px;
  transition: all 0.2s ease-in-out;
  padding: 20px 50px;
}
.content.open {
  margin-left: 600px;
  padding: 20px;
}

.open-enter-active {
  animation: drawer 0.25s ease-in-out;
}
.open-leave-active {
  animation: drawer 0.25s reverse ease-in-out;
}
@keyframes drawer {
  0% {
    width: 0;
  }
  100% {
    width: 600px;
  }
}
</style>
