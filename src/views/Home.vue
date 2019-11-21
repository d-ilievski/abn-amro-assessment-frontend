<template>
  <div class="home">
    <transition name="open">
      <RecipeDetails v-if="this.$route.meta.details" />
    </transition>
    <Navbar />
    <div class="content" :class="{open : this.$route.meta.details}">
      <router-view :key="$route.name + ($route.params.id || '')"></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import RecipeDetails from "@/components/RecipeDetails.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Home",
  components: {
    RecipeDetails,
    Navbar
  },
  data: () => {
    return {};
  }
};
</script>

<style scoped>
.content {
  margin-top: 48px;
  transition: margin .25s ease-in-out;
  padding: 20px 50px;
}
.content.open {
  margin-left: 600px;
  padding: 20px;
}

.open-enter-active {
  animation: drawer .25s;
}
.open-leave-active {
  animation: drawer .25s reverse;
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
