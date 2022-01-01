<template>
  <div id="app">
    <login-component v-if="!loggedIn" />
    <home-component v-else />
  </div>
</template>

<script>
import HomeComponent from "./components/HomeComponent.vue";
import LoginComponent from "./components/LoginComponent.vue";

export default {
  name: "App",
  components: {
    HomeComponent,
    LoginComponent,
  },
  data() {
    return {
      loggedIn: false,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
