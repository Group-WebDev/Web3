<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Join The Revolution</v-btn>
      </template>
      <v-card class="mx-auto card" max-width="400">
        <v-container>
          <center>
            <v-img src="@/assets/logos.png" id="image"></v-img>
            <h1>Login</h1>
          </center>
          <form id="form">
            <v-container>
              <v-text-field v-model="user.username" :rules="[rules.required]" label="Username"></v-text-field>
              <v-text-field
                v-model="user.email"
                :rules="[rules.required, rules.email]"
                label="E-mail"
              ></v-text-field>
              <v-text-field v-model="user.address" :rules="[rules.required]" label="Address"></v-text-field>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                <v-btn color="blue darken-1" :disabled="!formIsValid" text @click="checkform">Save</v-btn>
              </v-card-actions>
            </v-container>
          </form>
          <br />
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      dialog: false,
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
    checkform() {
      if (this.email !== null && this.password !== null) {
        this.dialog = false;
        axios
          .post("http://localhost:3000/subscribe", { user: user })
          .then(res => {
            alert("successfully loged in!")
          })
          .catch(err => {
            console.log(err);
          });
        this.$router.push("/homepage");
      }
      // e.preventDefault();
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
.card {
  margin-top: 5%;
}

#image {
  width: 40%;
  height: 40%;
}
</style>
