<template>
  <div id="login-view">
    <md-app>
      <md-app-content md-alignment="center">
        <div class="login-container">
          <md-card>
            <md-card-header>
              <md-card-header-text>
                <div class="md-title">Login</div>
              </md-card-header-text>
            </md-card-header>
            <md-card-content>
              <md-field>
                <label>Email</label>
                <md-input v-model="email" type="email"></md-input>
              </md-field>
              <md-field>
                <label>Password</label>
                <md-input v-model="password" type="password"></md-input>
              </md-field>
              <md-button class="md-raised md-primary">login</md-button>
            </md-card-content>
          </md-card>
        </div>
      </md-app-content>
    </md-app>
  </div>
</template>
<script>
export default {
  name: "LoginComponent",
  data() {
    return {
      email: undefined,
      password: undefined,
    };
  },
};
</script>
<style scoped>
.login-container {
  margin: -16px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;
  background-color: aqua;
}
#login-view {
  height: 100vh;
  width: 100vw;
}
.md-app {
  border: 1px solid rgba(#000, 0.12);
  height: 100vh;
}
.md-card {
  min-width: 300px;
  width: 30vw;
  border-radius: 5px;
}
</style>