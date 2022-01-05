<template>
  <div id="app">
    <router-view></router-view>
    <install-prompt />
    <update-dialog />
  </div>
</template>

<script>
import InstallPrompt from "./components/InstallPrompt.vue";
import UpdateDialog from "./components/UpdateDialog.vue";
export default {
  components: { InstallPrompt, UpdateDialog },
  name: "App",
  data() {
    return {
      loggedIn: false,
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    this.loggedIn = token !== undefined;
    if (this.loggedIn) {
      this.$router.replace("/home");
    }
  },
  methods: {
    async accept() {
      this.showUpdateUI = false;
      await this.$workbox.messageSW({ type: "SKIP_WAITING" });
    },
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
