<template>
  <vModal :show="show" :title="title" @cancel="cancel">
    <template v-slot:body>
      <slot></slot>
    </template>
    <template v-slot:buttons>
      <button
        type="button"
        class="btn"
        :class="danger ? 'btn-danger' : 'btn-confirm'"
        @click.prevent="confirm"
      >
        {{ confirmButton }}
      </button>
      <button
        type="button"
        class="btn btn-secondary"
        data-dismiss="modal"
        @click.prevent="cancel"
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
    cancel() {
      this.$emit("cancel");
    },
    confirm() {
      this.$emit("confirm");
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