<template>
  <v-card class="mx-auto card" max-width="500">
    <v-container>
      <center>
        <v-img :src="require('@/assets/logos.png')" id="image"></v-img>
      </center>
      <form id="form">
        <v-container>
          <v-text-field v-model="user.username" :rules="[rules.required]" label="Username"></v-text-field>
          <v-text-field v-model="user.email" :rules="[rules.required, rules.email]" label="E-mail"></v-text-field>
          <v-text-field v-model="user.address" :rules="[rules.required]" label="Address"></v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" :disabled="!formIsValid" text @click="checkform">Join</v-btn>
          </v-card-actions>
        </v-container>
      </form>
      <br />
    </v-container>
  </v-card>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      user: {
        username: "",
        email: "",
        address: ""
      },
      rules: {
        required: value => !!value || "Required.",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      }
    };
  },
  methods: {
    checkform: function(e) {
      if (this.email !== null && this.password !== null) {
        this.dialog = false;
        axios
          .post("http://localhost:3000/subscribe", { user: this.user })
          .then(res => {
            alert("successfully loged in!");
          })
          .catch(err => {
            console.log(err);
          });
        this.$router.push("/homepage");
      }
      e.preventDefault();
    }
  },
  computed: {
    formIsValid() {
      return this.user.username && this.user.address && this.user.email;
    }
  }
};
</script>

<style>
#image {
  width: 40%;
  height: 40%;
}
</style>