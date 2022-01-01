<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <md-button
          class="md-icon-button"
          @click="toggleMenu"
          v-if="!menuVisible"
        >
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Welcome {{ name }}</span>
        <md-button class="md-accent">
          <span @click="logOut">logout</span>
        </md-button>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>Navigation</span>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list>
          <md-list-item @click="navigate('inventory')">
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">My Inventory</span>
          </md-list-item>

          <md-list-item @click="navigate('sale')">
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Sale</span>
          </md-list-item>

          <md-list-item @click="navigate('profile')">
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">My Profile</span>
          </md-list-item>

          <md-list-item @click="navigate('spam')">
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
export default {
  name: "HomeComponent",
  data() {
    return {
      name: "Akshay",
      menuVisible: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    navigate: (to_here) => {
      console.log("navigated", to_here);
    },
    logOut: () => {
      console.log("logged out");
    },
  },
};
</script>