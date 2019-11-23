<template>
  <div class="search">
    <input
      type="text"
      class="form-control search-input"
      placeholder="Search Recipes"
      v-model="searchTerm"
      @input="search"
    />
    <vSpinner class="spinner" v-if="loading" />
  </div>
</template>

<script>
import vSpinner from "./vSpinner.vue";
import { RecipeActions } from "../utils/constants";

export default {
  name: "vSearch",
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
        () =>
          this.$eventBus.$emit(
            RecipeActions.SearchRecipes,
            this.$data.searchTerm
          ),
        250
      );
    }
  }
};
</script>

<style scoped>
.search {
  position: relative;
}

.search-input {
  padding-right: 40px;
  border-radius: 0;
}

.search-input:focus {
  outline: 0;
  box-shadow: none;
  border: 1px solid #ced4da;
}

.spinner {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
