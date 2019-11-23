<template>
  <div class="navbar">
    <!-- Show search on mobile only -->
    <!-- Hide search and show actions on mobile only -->
    <div
      class="wrapper d-sm-flex d-lg-none d-flex align-items-center justify-content-between"
      v-if="this.$route.name === 'recipeDetails'"
    >
      <div class="back">
        <router-link :to="{ name: 'home' }" class="navbar-button">
          <i class="fas fa-chevron-left"></i>
          Back
        </router-link>
      </div>
      <div class="actions d-flex">
        <div class="edit navbar-button" @click.stop="edit">
          <i class="fas fa-edit"></i>
          Edit
        </div>
        <div class="delete navbar-button" @click.stop="remove">
          <i class="fas fa-trash"></i>
          Delete
        </div>
      </div>
    </div>
    <div v-else class="container d-lg-none d-sm-flex justify-content-center">
      <input
        type="text"
        class="search-input"
        placeholder="Search recipes.."
        v-model="searchTerm"
        @input="search"
      />
      <vSpinner class="spinner" v-if="loading" />
    </div>
  </div>
</template>

<script>
import vSpinner from "@/components/vSpinner.vue";
import { RecipeActions } from "@/utils/constants";

export default {
  name: "Navbar",
  components: {
    vSpinner
  },
  data: () => {
    return {
      searchTerm: ""
    };
  },
  props: {
    loading: Boolean
  },
  methods: {
    search() {
      this.$helpers.debounce(
        () => this.$eventBus.$emit(RecipeActions.SearchRecipes, this.$data.searchTerm),
        250
      );
    },
    edit() {
      this.$eventBus.$emit(RecipeActions.EditRecipe)
    },
    remove() {
      this.$eventBus.$emit(RecipeActions.DeleteRecipe)
    }
  }
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
  padding: 0 20px;
  z-index: 1;
}

.navbar-button {
  color: white;
}

.wrapper {
  width: 100%;
  position: relative;
}

.spinner {
  position: absolute;
  right: 40px;
}

.edit {
  margin-right: 20px;
}

.search-input {
  /* reset */
  outline: none;
  border: none;
  background: none;
  border-radius: 0;
  /* end reset */
  width: 100%;
  border-bottom: 1px solid white;
  color: #fff;

  padding-right: 40px;
}
</style>
