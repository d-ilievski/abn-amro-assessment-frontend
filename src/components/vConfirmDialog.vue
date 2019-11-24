<template>
  <vModal :show="show" :title="title" @close="close">
    <template v-slot:body>
      <slot></slot>
    </template>
    <template v-slot:buttons>
      <button
        type="button"
        class="btn"
        :class="danger ? 'btn-danger' : 'btn-confirm'"
      >
        {{ confirmButton }}
      </button>
      <button
        type="button"
        class="btn btn-secondary"
        data-dismiss="modal"
        @click.prevent="close"
      >
        {{ declineButton }}
      </button>
    </template>
  </vModal>
</template>

<script>
import vModal from "@/components/vModal.vue";

export default {
  name: "vConfirmDialog",
  components: {
    vModal
  },
  methods: {
    close() {
      this.$emit("close");
    }
  },
  props: {
    show: Boolean,
    title: String,
    confirmButton: String,
    declineButton: String,
    danger: Boolean
  }
};
</script>