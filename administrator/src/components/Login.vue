<template>
<v-card class="mx-auto card" max-width="500" color="rgba(255, 255, 255, 1)" :elevation="14">
    <v-snackbar v-model="snackbar" absolute top right color="success">
        <span>Registration successful!</span>
    </v-snackbar>
    <v-container>
        <v-form ref="form" v-model="formIsValid">
            <v-container class="container">
                <center>
                    <h1>Login</h1>
                </center>
                <v-text-field v-model="user.username" :rules="rules.required" color="purple darken-2" label="Username" required></v-text-field>
                <v-text-field v-model="user.password" :append-icon="show1 ? 'visibility' : 'visibility_off'" :rules="[rules.required, rules.password]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1" required></v-text-field>
            </v-container>
            <v-card-actions>
                <v-btn text @click="resetForm">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn :disabled="!formIsValid" text color="primary" type="submit" class="mr-4" @click="login">Login</v-btn>
            </v-card-actions>
        </v-form>
    </v-container>
</v-card>
</template>

<script>
export default {
    data:function() {

        return {
            formIsValid:false,
            username: '',
            password: '',
            rules: {
                required: value => !!value || 'Required.',
                password: value => {
                    const pattern = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
                    return pattern.test(value) || 'Password Must contain 1 capital, special characters, and more than 8 letters'
                },
            },
            conditions: false,
            snackbar: false,
            show1: false,
        }
    },
    created() {
        if (this.$route.params.user) {
            this.user = this.$route.params.user;
        } else {
            this.user = {
                username: '',
                password: '',
            };
        }
    },
    methods: {
       login: function () {
            // this.$router.push('/dashboard')
            let username = this.username
            let password = this.password
            this.$store.dispatch('login', {
                    username,
                    password
                })
                .then(() => this.$router.push('/dashboard'))
                .catch(err => {
                    console.log(err)
                    this.snackbar = true
                    resetForm()
                })
        },
        resetForm() {
            this.username = '',
                this.password = ''
        },
    },
}
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