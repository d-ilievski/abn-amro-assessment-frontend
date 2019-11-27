import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Navbar from "@/components/Navbar.vue";

describe("Navbar.vue", () => {
  const wrapper = shallowMount(Navbar);

  it("has correct props", () => {
    expect(wrapper.props.recipe).to.exist
  });
});
