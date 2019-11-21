<template>
<v-card class="mx-auto card" max-width="400">
    <v-container>
        <center><v-img src="@/assets/logos.png" id="image"></v-img>
        <h1>Login</h1></center>
        <form id="form">
            <v-container>
            <v-text-field v-model="user.username" :rules="[rules.required]" label="Username"></v-text-field>
            <v-text-field v-model="user.password" :append-icon="show1 ? 'visibility' : 'visibility_off'" :rules="[rules.required, rules.password]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
            <v-btn class="mr-4" @click="checkform" color="green">submit</v-btn>
            <v-btn @click="clear">clear</v-btn>
            </v-container>
        </form><br />
    </v-container>
</v-card>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            show1: false,
            password: 'Password',
            user: {
                username:'',
                password: ''

            },
            rules: {
                required: value => !!value || 'Required.',
                password: value => {
                    const pattern = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
                    return pattern.test(value) || 'Password Must contain 1 capital, special characters, and more than 8 letters'
                },
            }
        }
    },
    methods: {
        checkform: function () {
            if (this.user.username !== null && this.user.password !== null) {
                   sessionStorage.setItem('authenticated', true);
            sessionStorage.setItem('username', this.user.username);
            this.$store.commit("setAuthentication", true);
                this.$router.go({ name: 'homepage' }).catch(err => {
            console.log(err)})
              
            }
            // e.preventDefault();
        },
        clear() {
            this.$v.$reset()
            this.user. password = ''
        },
    },
}
</script>

<style>
.card {
    margin-top: 5%;
}
#image{
    width: 40%;
    height: 40%;
}
</style>
