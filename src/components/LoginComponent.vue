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
              <md-button class="md-raised md-primary" @click="login"
                >login</md-button
              >
              <div style="padding-top: 5px">
                <span>Not a User? </span>
                <router-link to="/signup">Sign Up</router-link>
              </div>
            </md-card-content>
          </md-card>
          <md-snackbar
            :md-duration="4000"
            :md-active.sync="showSnackbar"
            md-persistent
          >
            <span>{{ loginMessage }}</span>
            <md-button class="md-primary" @click="showSnackbar = false"
              >Retry</md-button
            >
          </md-snackbar>
        </div>
      </md-app-content>
    </md-app>
  </div>
</template>
<script>
import axios from "axios";
import router from "../router/index";
import BASE_URL from "../constants/index";
const url = BASE_URL.BASE_URL;

export default {
  name: "LoginComponent",
  data() {
    return {
      email: "",
      password: "",
      showSnackbar: false,
      loginMessage: "",
    };
  },
  methods: {
    login() {
      if (this.email && this.password) {
        axios
          .post(url + "/api/user/login", {
            email: this.email,
            password: this.password,
          })
          .then((res_) => {
            if (res_.status === 200) {
              localStorage.setItem("token", res_.data["token"]);
              localStorage.setItem("userName", res_.data["name"]);
              localStorage.setItem("userEmail", res_.data["email"]);
              this.loginMessage = res_.data["message"];
              router.replace("/home");
            }
          })
          .catch(() => {
            this.loginMessage = "Invalid credentials!";
            this.showSnackbar = true;
          });
      }
    },
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
  background-color: #00dbde;
  background-image: linear-gradient(43deg, #00dbde 0%, #fc00ff 100%);
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