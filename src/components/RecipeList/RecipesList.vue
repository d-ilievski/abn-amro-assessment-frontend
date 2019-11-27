<template>
  <div class="RecipesList">
    <div class="container top-controls">
      <div class="actions d-flex align-items-center justify-content-between">
        <div class="add" @click="add">
          <i class="fas fa-plus"></i>
          Add New Recipe
        </div>
        <div class="d-none d-lg-block">
          <vSearch :loading="loading" />
        </div>
      </div>
    </div>
    <div class="container list">
      <RecipeListItem
        v-for="recipe in recipes"
        :recipe="recipe"
        :key="`li-${recipe.id}`"
      />
    </div>
    <div class="results text-center">
      {{ this.queryOptions.totalElements }}
      results
    </div>
    <div class="paging d-flex align-items-center">
      <span
        class="prev"
        :class="{ disabled: this.queryOptions.page === 0 }"
        @click.prevent="prevPage"
      >
        <i class="fas fa-chevron-left"></i>
        Prev
      </span>
      <span
        class="next"
        :class="{ disabled: isLastPage }"
        @click.prevent="nextPage"
      >
        Next
        <i class="fas fa-chevron-right"></i>
      </span>
    </div>
  </div>
</template>

<script>
import RecipeListItem from "./RecipeListItem.vue";
import vSearch from "@/components/vSearch.vue";
import { RecipeActions } from "@/utils/constants";

export default {
  name: "RecipesList",
  components: {
    RecipeListItem,
    vSearch
  },
  props: {
    recipes: Array,
    loading: Boolean,
    queryOptions: Object,
  },
  methods: {
    prevPage() {
      if (this.queryOptions.page > 0) {
        this.$eventBus.$emit(RecipeActions.SearchRecipes, this.queryOptions.searchTerm, this.queryOptions.page - 1)
      }
      
      // this.queryOptions.page -= 1;
    },
    nextPage() {
      if (!this.isLastPage) {
        this.$eventBus.$emit(RecipeActions.SearchRecipes, this.queryOptions.searchTerm, this.queryOptions.page + 1)
      } 
      // this.queryOptions.page += 1;
    },
    add() {
      this.$eventBus.$emit(RecipeActions.AddRecipe);
    }
  },
  computed: {
    isLastPage() {
      // calculate by number of results
      return this.queryOptions.page === this.queryOptions.totalPages - 1 || this.queryOptions.totalPages === 0;
    }
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

.top-controls {
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

.paging {
  padding: 0;
  justify-content: flex-end;
  margin: 20px 0;
}

.paging .next,
.paging .prev {
  margin-left: 20px;
  user-select: none;
}
.paging .next:hover,
.paging .prev:hover {
  cursor: pointer;
  color: rgb(17, 145, 0);
}

.paging .prev.disabled,
.paging .next.disabled {
  color: rgb(139, 139, 139);
}

.paging .prev.disabled:hover,
.paging .next.disabled:hover {
  cursor: default;
}

.results {
  margin-top: 20px;
  color: rgb(139, 139, 139);
}

@media screen and (max-width: 991px) {
  .paging {
    color: #fff;
    background: black;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 15px;
    margin: 0;
    justify-content: space-between;
    width: 100%;
  }
  .paging .prev {
    margin: 0;
  }
  .results {
    margin-bottom: 50px;
  }
}
</style>
