<template>
  <div class="RecipesList">
    <div class="container">
      <div class="actions">
        <span class="add">
          <i class="fas fa-plus"></i>
          Add New Recipe
        </span>
      </div>
    </div>
    <div class="container list">
      <RecipeListItem
        v-for="recipe in recipes"
        :recipe="recipe"
        :key="`li-${recipe.id}`"
      />
    </div>
  </div>
</template>

<script>
import RecipeListItem from "./RecipeListItem.vue";

export default {
  name: "RecipesList",
  components: {
    RecipeListItem
  },
  props: {
    recipes: Array
  }
};
</script>

<style scoped>
.list {
  width: 100%;
  background: white;
  box-shadow: 5px 5px 24px 0px rgba(0, 0, 0, 0.25);
  padding: 0;
}

.actions {
  margin-bottom: 10px;
  text-align: left;
}

.actions .add {
  font-size: 1em;
}
.actions .add:hover {
  cursor: pointer;
  color: rgb(17, 145, 0);
}
</style>
