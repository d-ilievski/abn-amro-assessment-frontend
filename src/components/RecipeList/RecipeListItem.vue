<template>
  <div class="recipeListItem" @click="openRecipeDetails">
    <div class="info">
      <div class="name">
        {{ recipe.name }}
      </div>
      <div class="vegetarian">
        <i class="fas fa-seedling" v-if="recipe.vegetarian"></i>
      </div>
      <div class="servings">
        {{ recipe.servings }}
        {{ recipe.servings === 1 ? "serving" : "servings" }}
      </div>
    </div>
    <div class="actions">
      <span @click.stop="edit" class="edit">
        <i class="fas fa-edit"></i>
      </span>
    </div>
  </div>
</template>

<script>
import router from "@/router/index";
import { RecipeActions } from "@/utils/constants";

export default {
  name: "RecipeListItem",
  router,
  props: {
    recipe: Object
  },
  methods: {
    openRecipeDetails() {
      // prevent route duplication
      if (this.$route.params.id !== this.$props.recipe.id) {
        // publish event
        this.$eventBus.$emit(RecipeActions.ViewRecipe, this.$props.recipe);

        // redirect
        this.$router.push({
          name: "recipeDetails",
          params: { id: this.$props.recipe.id }
        });
      }
    },
    edit() {
      this.$eventBus.$emit(RecipeActions.EditRecipe, this.$props.recipe);
    }
  }
};
</script>

<style scoped>
.recipeListItem {
  width: 100%;
  background: #fff;
  border-bottom: 1px solid rgb(230, 230, 230);
  padding: 10px 20px;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
}
.recipeListItem:hover {
  background: rgb(245, 245, 245);
  cursor: pointer;
}

.info {
  display: flex;
  width: 95%;
}

.name {
  width: 50%;
  text-align: left;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.vegetarian {
  width: 40px;
  color: rgb(17, 145, 0);
}

.actions .edit {
  visibility: hidden;
}

/* only show edit button on hover */
.recipeListItem:hover .actions .edit {
  visibility: visible;
}

@media (hover: hover) {
  .recipeListItem:hover .actions .edit {
    visibility: visible;
  }

  .actions .edit:hover {
    color: rgb(17, 145, 0);
  }
}
</style>
