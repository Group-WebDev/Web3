<template>
<div  id="background">
  <v-flex justify-center>
   <h1 class="subtitle-110 text-center">GoEco</h1>  
    <v-card class="mx-auto card" max-width="400"> 
      <v-container>
        <center>
          <v-img src="@/assets/accountIcon.jpeg" id="image"></v-img>
          <h1>Admin</h1>
        </center>
        <form id="form">
          <v-container>
            <v-text-field v-model="user.username" :rules="[rules.required]" label="Username"></v-text-field>
            <v-text-field
              v-model="user.password"
              :append-icon="show1 ? 'fas fa-eye' : 'fas fa-eye-slash'"
              :rules="[rules.required, rules.password]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
            
              label="Password"
              
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
            <v-btn class="mr-4" @click="checkform" :disabled="!validinput"  color="green">submit</v-btn>
            <v-btn @click="clear">clear</v-btn>
          </v-container>
        </form>
        <br />
      </v-container>
    </v-card>
  </v-flex>
  </div>
</template>
<style>
h1, h2 {
    font-weight: normal;
    color: teal;
}

.v-content__wrap {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    max-width: 100%;
    position: relative;
}
.v-application .text-center {
    text-align: center !important;
    font-size: 80px;
    color: white;
}
.card {
  margin-top: 1%;
}
#image {
  width: 40%;
  height: 40%;
}
</style>
<script>
import {Login} from '../store/axios.js'
export default {
  data() {
    return {
      show1: false,
      password: "Password",
      user: {
        username: "",
        password: ""
      },
      rules: {
        required: value => !!value || "Required.",
        min: value => value.length >= 8 || 'Min 8 characters',
        password: value => {
          const pattern = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
        //   valid = true;
          return (
            pattern.test(value) ||
            "Password Must contain 1 capital, special characters, and more than 8 letters"
          );
        }
      }
    };
  },
  methods: {
    checkform: function() {
      let data={
       username: this.user.username,
       password:this.user.password
      }
      Login(data)
      .then(data =>{
        alert(data)
        this.$emit('Login',data.data);

      })
      .catch(err=> alert(err));

      if (data.username !== null && data.password !== null) {
        // sessionStorage.setItem("authenticated", true);
        // sessionStorage.setItem("username", this.username);
        // this.$store.commit("setAuthentication", true);
        // this.$router.push("/home");
      }
      // e.preventDefault();
    },
    clear() {
      this.$v.$reset();
      this.username = "";
      this.password = "";
    }
  },
  computed: {
    validinput() {
    //   if () {
        let value=/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
        return this.user.username && value.test(this.user.password);
    //   }
    }
  }
};
</script>
