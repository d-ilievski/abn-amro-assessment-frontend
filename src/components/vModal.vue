<template>
  <transition name="show">
    <div class="modal d-block" tabindex="-1" role="dialog" v-if="show">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click.prevent="close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
          <div class="modal-footer">
            <slot name="buttons"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "vModal",
  props: {
    show: Boolean,
    title: String
  },
  methods: {
    close() {
      this.$emit("close");
    }
  },
  watch: {
    show: value => {
      if (value) document.body.style.overflow = "hidden";
      else document.body.style.overflow = "unset";
    }
  }
};
</script>

<style scoped>
.modal {
  background: rgba(0, 0, 0, 0.5);
}

.show-enter-active,
.show-leave-active {
  transition: all 0.25s;
}
.show-enter,
.show-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
