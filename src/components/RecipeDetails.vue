<template>
  <div class="recipeDetails">
    <div class="wrapper">
      <div
        class="actions d-none align-items-center justify-content-between d-lg-flex d-md-none"
      >
        <div class="d-flex">
          <div class="delete" @click="remove">
            <i class="fas fa-trash"></i>
          </div>
          <div class="edit" @click="edit">
            <i class="fas fa-edit"></i>
          </div>
        </div>
        <div class="close-recipe">
          <router-link :to="{ name: 'home' }" class="close-recipe-link">
            <i class="fas fa-chevron-left"></i>
            Close
          </router-link>
        </div>
      </div>
      <div class="image">
        <img
          :src="`https://via.placeholder.com/600x300?text=${recipe.name}+Photo`"
        />
      </div>
      <div class="name">
        <h2>{{ recipe.name }}</h2>
      </div>
      <hr />
      <div class="labels">
        <div class="vegetarian">
          <span v-if="recipe.vegetarian">
            <i class="fas fa-seedling icon"></i>
            Vegetarian
          </span>
        </div>
        <div class="servings">
          {{ recipe.servings }}
          {{ recipe.servings === 1 ? "serving" : "servings" }}
        </div>
      </div>
      <div class="date text-right" v-if="recipe.createdOn">
        Created on
        {{ recipe.createdOn | moment("DD-MM-YYYY HH:mm") }}
      </div>
      <div class="ingredients text-left">
        <h5 class="title">Ingredients:</h5>
        <ul>
          <li
            v-for="(ingredient, index) in recipe.ingredients"
            :key="`ingr_${index}`"
          >
            {{ ingredient.name }}
          </li>
        </ul>
      </div>
      <hr />
      <div class="instructions text-left">
        <h5 class="title">Instructions:</h5>
        <div v-html="recipe.instructions"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { RecipeActions } from "@/utils/constants"

export default {
  name: "RecipeDetails",
  props: {
    recipe: Object
  },
  methods: {
    edit() {
      this.$eventBus.$emit(RecipeActions.EditRecipe, this.$props.recipe);
    },
    remove() {
      this.$eventBus.$emit(RecipeActions.DeleteRecipe, this.$props.recipe);
    }
  }
};
</script>

<style scoped>
.recipeDetails {
  position: fixed;
  top: 0;
  left: 0;
  width: 600px;
  height: 100%;
  color: rgb(49, 49, 49);
  overflow: hidden;

  background: #fff;
}

.wrapper {
  padding: 20px;
  padding-top: 70px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

.actions {
  margin-bottom: 10px;
}

.delete {
  color: rgb(172, 172, 172);
}
.delete:hover {
  color: rgb(145, 0, 0);
  cursor: pointer;
}

.edit {
  color: rgb(172, 172, 172);
  margin-left: 20px;
}
.edit:hover {
  color: rgb(17, 145, 0);
  cursor: pointer;
}

.image {
  width: 100%;
  max-height: 250px;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
}
.image img {
  min-width: 100%;
  height: auto;
}

.name {
  margin-top: 20px;
  color: rgb(145, 0, 0);
}

.labels {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.vegetarian .icon {
  color: rgb(17, 145, 0);
}

.date {
  font-size: 0.85em;
  margin: 10px 0;
  color: rgb(172, 172, 172);
}

.instructions {
  min-width: 100%;
}

.instructions .title {
  text-align: left;
  margin: 10px 0;
}

.close-recipe {
  text-align: right;
}
.close-recipe-link {
  font-size: 1em;
  color: rgb(49, 49, 49);
}
.close-recipe-link:hover {
  cursor: pointer;
  color: rgb(17, 145, 0);
  text-decoration: none;
}

/* Media Queries */
@media screen and (max-width: 991px) {
  .recipeDetails {
    width: 100%;
  }

  .image {
    min-width: 100%;
  }
}
</style>
