<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  height: 100%;
}

body {
  background: rgb(230, 230, 230);
}

.btn-confirm {
  background: rgb(17, 145, 0);
  border: 1px solid rgb(17, 145, 0);
  color: white;
}
.btn-confirm:hover {
  color: white;
  background: rgb(71, 161, 60);
}

.btn {
  border-radius: 0 !important;
}

input.error,
input.error:focus {
  border-color: rgb(220, 53, 69);
  background-color: rgba(220, 53, 69, .09);
}
.validation-message {
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
}
label.required::after {
  color: #dc3545;
  content: ' *';
}
</style>
