import { expect } from "chai";
import { mount } from "@vue/test-utils";
import Home from "@/views/Home.vue";
import Vue from 'vue';
import wysiwyg from "vue-wysiwyg";

Vue.prototype.$eventBus = new Vue();
Vue.use(wysiwyg, {});

describe("Home.vue", () => {

  const wrapper = mount(Home);

  it("Recipe details appear correctly", () => {

    wrapper.setData({recipes: [{
      id: 1,
      name: "Daniel's Recipe",
      servings: 1
    }]});

    const item = wrapper.find(".recipeListItem");
    item.trigger("click");

    const recipeDetails = wrapper.find(".recipeDetails");
    expect(recipeDetails.is('div')).to.be.true
  });

  it("Doesn't allow creating recipe with empty required fields", () => {

    wrapper.setData({workRecipe: {
      id: 1,
      name: "Daniel's Recipe",
      servings: 1
    }});

    wrapper.find(".add").trigger("click");

    const addEditModal = wrapper.find(".modal");
    expect(addEditModal.is('div'))

    wrapper.setData({workRecipe: {
      id: 1,
      name: null,
      servings: null
    }});

    wrapper.find(".btn-confirm").trigger("click");

    expect(addEditModal.is('div'))
  });

});
