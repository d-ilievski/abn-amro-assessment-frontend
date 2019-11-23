<template>
  <div class="spinner"></div>
</template>

<style scoped>
.spinner,
.spinner:after {
  border-radius: 50%;
  width: 20px;
  height: 20px;
}
.spinner {
  position: relative;
  border-top: 2px solid rgba(255, 255, 255, 0.6);
  border-right: 2px solid rgba(255, 255, 255, 0.6);
  border-bottom: 2px solid rgba(255, 255, 255, 0.6);
  border-left: 2px solid rgb(17, 145, 0);
  transform: translateZ(0);
  animation: load8 1.1s infinite linear;
}
@keyframes load8 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
