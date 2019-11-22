<template>
  <div class="recipeDetails">
    <div class="wrapper">
      <div class="close-recipe">
        <router-link :to="{name: 'home'}" class="close-recipe-link">
          <i class="fas fa-times"></i>
          Close
        </router-link>
      </div>
      <div class="image">
        <img
          :src="
            `https://via.placeholder.com/600x300?text=${recipe.name}+Photo`
          "
        />
      </div>
      <div class="name">
        <h2>{{ recipe.name }}</h2>
      </div>
      <hr />
      <div class="labels">
        <div class="vegetarian">
          <span v-if="recipe.isVegetarian">
            <i class="fas fa-seedling icon"></i>
            Vegetarian
          </span>
        </div>
        <div class="servings">
          {{ recipe.servings }}
          {{ recipe.servings === 1 ? "serving" : "servings" }}
        </div>
      </div>
      <div class="instructions">
        <h5 class="title">Instructions:</h5>
        <div v-html="recipe.instructions"></div>
        
      </div>
      <div class="delete">
        <i class="fas fa-trash"></i>
        Delete Recipe
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecipeDetails",
  props: {
    recipe: Object
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

.image {
  min-width: 560px;
  max-height: 300px;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
}
.image img {
  width: 100%;
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

.instructions {
  min-width: 543px;
}

.instructions .title {
  text-align: left;
  margin: 20px 0;
}

.close-recipe {
  text-align: right;
  margin: 0 0 10px 0;
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
</style>
