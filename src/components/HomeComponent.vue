<template>
  <div class="page-container">
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Welcome {{ name }}</span>
        <md-button @click="logOut">logOut</md-button>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0"
          >Navigation</md-toolbar
        >

        <md-list>
          <md-list-item @click="navigate('/home')">
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">My Inventory</span>
          </md-list-item>

          <md-list-item @click="navigate('/sale')">
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Sale</span>
          </md-list-item>

          <md-list-item @click="navigate('/profile')">
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">My Profile</span>
          </md-list-item>

          <md-list-item @click="navigate('/home')">
            <md-icon>error</md-icon>
            <span class="md-list-item-text">Spam</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>
      <md-app-content>
        <router-view />
      </md-app-content>
    </md-app>
  </div>
</template>

<style scoped>
.md-app {
  border: 1px solid rgba(#000, 0.12);
  height: 100vh;
}
.md-drawer {
  height: 100vh;
  width: 230px;
  max-width: calc(100vw - 125px);
}
.md-list-item {
  cursor: pointer;
}
</style>

<script>
import router from "../router/index";
export default {
  name: "HomeComponent",
  data() {
    return {
      name: "",
      menuVisible: false,
    };
  },
  methods: {
    navigate(to_here) {
      router.push(to_here);
      this.menuVisible = !this.menuVisible;
    },
    logOut: () => {
      localStorage.clear();
      router.replace("/");
    },
  },
  mounted() {
    this.name = localStorage.getItem("userName");
  },
};
</script>