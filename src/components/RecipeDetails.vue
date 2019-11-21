<template>
  <div class="recipeDetails">
  </div>
</template>

<script>
export default {
  name: 'RecipeDetails',
  props: {
    msg: String
  }
}
</script>

<style scoped>
.recipeDetails {
  position: fixed;
  top: 0;
  left: 0;
  width: 600px;
  height: 100%;
  background: rgb(49, 49, 49);
}
</style>
