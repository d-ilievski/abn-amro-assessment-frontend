<template>
  <vModal :show="show" :title="title" @close="close">
    <template v-slot:body>
      <form class="text-left">
        <div class="form-group">
          <label for="recipeName" class="required">Recipe Name</label>
          <ValidationProvider v-slot="{ errors }" rules="required">
            <input
              type="text"
              class="form-control"
              id="recipeName"
              placeholder="Enter Recipe Name"
              v-model="recipe.name"
              :class="{'error':errors[0]}"
            />
            <span class="validation-message">{{errors[0]}}</span>
          </ValidationProvider>
        </div>
        <div class="form-group">
          <div>
            <label>Ingredients</label>
            <button class="btn btn-confirm btn-sm ingredient-btn" @click.prevent="addIngredient">
              <i class="fas fa-plus"></i>
              Add
            </button>
          </div>
          <div class="ingredients-list">
            <div
              class="ingredient d-flex align-items-center"
              v-for="(ingredient, index) in recipe.ingredients"
              :key="`${ingredient}_${index}`"
            >
              <input
                type="text"
                class="form-control ingredient-input"
                placeholder="Ingredient Name"
                v-model="ingredient.name"
              />
              <span class="ingredient-delete" @click="removeIngredient(ingredient)">
                <i class="fas fa-trash"></i>
              </span>
            </div>
          </div>
        </div>
        <div class="form-row align-items-center">
          <div class="col-6">
            <div class="form-group">
              <ValidationProvider v-slot="{ errors }" rules="required|min_value:0">
                <label for="servings" class="required">Servings</label>
                <input
                  type="text"
                  class="form-control"
                  id="servings"
                  placeholder="No. Servings"
                  v-model="recipe.servings"
                  :class="{'error':errors[0]}"
                />
                <span class="validation-message">{{errors[0]}}</span>
              </ValidationProvider>
            </div>
          </div>
          <div class="col-6">
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="vegetarainCbx"
                v-model="recipe.vegetarian"
              />
              <label class="form-check-label" for="vegetarianCbx">Vegetarian</label>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="recipePhoto">Recipe Photo</label>
          <div>
            <input
              type="file"
              accept="image/png, image/jpeg"
              id="recipePhoto"
              placeholder="Enter Recipe Name"
              class="upload"
              :ref="'recipePhotoUpload'"
              @change="choosePhoto"
            />
          </div>
          <small class="text-muted" v-if="editing">Note: Photo will be overriden!</small>
        </div>
        <div class="form-group">
          <label for="recipeInstructions">Recipe Instructions</label>
          <small
            class="text-muted d-block d-md-none"
          >Please turn your device sideways for better experience.</small>
          <wysiwyg v-model="recipe.instructions" />
        </div>
      </form>
    </template>
    <template v-slot:buttons>
      <button type="submit" class="btn btn-confirm" @click.prevent="submit">Save</button>
      <button type="submit" class="btn btn-secondary" @click.prevent="close">Cancel</button>
    </template>
  </vModal>
</template>

<script>
import vModal from "@/components/vModal.vue";
import { ValidationProvider } from "vee-validate";

export default {
  name: "AddEditRecipeModal",
  components: {
    vModal,
    ValidationProvider
  },
  data: () => {
    return {
      ingredientKey: 0
    };
  },
  props: {
    show: Boolean,
    editing: Boolean,
    recipe: Object
  },
  methods: {
    close() {
      this.$emit("close");
    },
    submit() {
      this.$emit("submit");
    },
    removeIngredient(ingredient) {
      let index = this.$props.recipe.ingredients.indexOf(ingredient);
      if (index != -1) this.$props.recipe.ingredients.splice(index, 1);
    },
    addIngredient() {
      this.$props.recipe.ingredients.push({ name: "" });
    },
    choosePhoto() {
      this.$emit("choosePhoto", this.$refs.recipePhotoUpload.files[0]);
    }
  },
  computed: {
    title() {
      if (this.$props.editing) return "Edit Recipe";
      else return "Add Recipe";
    }
  }
};
</script>

<style scoped>
.ingredient {
  padding: 10px;
}

.ingredient-btn {
  margin-left: 30px;
}

.ingredients-list {
  max-height: 200px;
  overflow-y: auto;
  background: rgb(224, 224, 224);
}

.ingredient-delete {
  margin-left: 10px;
}
.ingredient-delete:hover {
  color: rgb(145, 0, 0);
  cursor: pointer;
}

.upload {
  width: 100%;
}
</style>
