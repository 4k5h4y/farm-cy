<template>
  <div id="signup-view">
    <md-app>
      <md-app-content md-alignment="center">
        <div class="signup-container">
          <md-card>
            <md-card-header>
              <md-card-header-text>
                <div class="md-title">Sign Up</div>
              </md-card-header-text>
            </md-card-header>
            <md-card-content>
              <md-field>
                <label>Name</label>
                <md-input v-model="name"></md-input>
              </md-field>
              <md-field>
                <label>Email</label>
                <md-input v-model="email" type="email"></md-input>
              </md-field>
              <md-field>
                <label>Contact</label>
                <md-input v-model="contact" type="number"></md-input>
              </md-field>
              <md-field>
                <label>Password</label>
                <md-input v-model="password" type="password"></md-input>
              </md-field>
              <md-field>
                <label>Confirm Password</label>
                <md-input v-model="password_2" type="password"></md-input>
              </md-field>
              <md-button class="md-raised md-primary" @click="signup"
                >signup</md-button
              >
              <div style="padding-top: 5px">
                <span>Already a User? </span>
                <router-link to="/">Login</router-link>
              </div>
            </md-card-content>
          </md-card>
        </div>
      </md-app-content>
    </md-app>
  </div>
</template>
<script>
import router from "../router/index";
import axios from "axios";
import BASE_URL from "../constants/index";
const url = BASE_URL.BASE_URL;
export default {
  name: "SignupComponent",
  data() {
    return {
      name: undefined,
      email: undefined,
      contact: undefined,
      password: undefined,
      password_2: undefined,
    };
  },
  methods: {
    signup() {
      if (
        this.name &&
        this.contact &&
        this.email &&
        this.password &&
        this.password_2 &&
        this.password_2 === this.password
      ) {
        axios
          .post(url + "/api/user/signup", {
            name: this.name,
            contact: this.contact,
            email: this.email,
            password: `+91${this.password}`,
            role: "OWNER",
          })
          .then((res_) => {
            if (res_.status === 201) {
              axios
                .post(url + "/api/user/login", {
                  email: this.email,
                  password: this.password,
                })
                .then((res_) => {
                  if (res_.status === 200) {
                    console.log(res_.data);
                    localStorage.setItem("token", res_.data["token"]);
                    localStorage.setItem("userName", res_.data["name"]);
                    localStorage.setItem("userEmail", res_.data["email"]);
                    router.replace("/home");
                  }
                });
            }
          });
      }
    },
  },
};
</script>
<style scoped>
.signup-container {
  margin: -16px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;
  background-color: #00dbde;
  background-image: linear-gradient(43deg, #00dbde 0%, #fc00ff 100%);
}
#signup-view {
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