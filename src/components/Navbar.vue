<template>
  <div class="navbar">
    <router-link :to="{ name: 'recipesList' }">LIST</router-link>|
    <router-link :to="{ name: 'recipeDetails', params: {id: 1} }">DETAILS</router-link>
  </div>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  background: rgb(27, 27, 27);
  padding-left: 600px;
}
</style>
