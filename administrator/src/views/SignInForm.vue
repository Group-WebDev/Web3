<template>
<v-card class="mx-auto card" max-width="500" color="rgba(255, 255, 255, 1)" :elevation="14">
    <v-snackbar v-model="snackbar" absolute top right color="success">
        <span>Registration successful!</span>
    </v-snackbar>
    <v-container>
        <v-form ref="user" @submit.prevent="submit">
            <v-container class="container">
                <center><v-img src="@/assets/logos.png" id="image"></v-img>
                    <h1>Register</h1></center>
                <v-text-field v-model="user.username" :rules="rules.required" color="purple darken-2" label="Username"></v-text-field>
                <v-text-field v-model="user.email" :rules="[rules.required, rules.email]" label="E-mail"></v-text-field>
                <v-text-field v-model="user.password" :append-icon="show1 ? 'visibility' : 'visibility_off'" :rules="[rules.required, rules.password]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                <v-col cols="12">
                    <v-checkbox v-model="user.terms" color="green">
                        <template v-slot:label>
                            <div @click.stop="">
                                Do you accept the
                                <a href="javascript:;" @click.stop="terms">terms</a>
                                and
                                <a href="javascript:;" @click.stop="conditions">conditions?</a>
                            </div>
                        </template>
                    </v-checkbox>
                </v-col>
            </v-container>
            <v-card-actions>
                <v-btn text @click="resetForm">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn :disabled="!formIsValid" text color="primary" type="submit" class="mr-4" @click="save">Register</v-btn>
            </v-card-actions>
        </v-form>
    </v-container>
    <v-dialog v-model="terms" width="70%">
        <v-card>
            <v-card-title class="title">Terms</v-card-title>
            <v-card-text v-for="n in 5" :key="n">
                {{ content }}
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="purple" @click="terms = false">Ok</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="conditions" width="70%">
        <v-card>
            <v-card-title class="title">Conditions</v-card-title>
            <v-card-text v-for="n in 5" :key="n">
                {{ content }}
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="purple" @click="conditions = false">Ok</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-card>
</template>

<script>
export default {
    show1: false,
    data() {
        const defaultForm = Object.freeze({
            username: '',
            email: '',
            password: '',
            terms: false,
        })

        return {
            user: Object.assign({}, defaultForm),
            rules: {
                required: value => !!value || 'Required.',
                password: value => {
                    const pattern = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
                    return pattern.test(value) || 'Password Must contain 1 capital, special characters, and more than 8 letters'
                },
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                },
            },
            conditions: false,
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.`,
            snackbar: false,
            terms: false,
            defaultForm,
        }
    },
    created() {
        if (this.$route.params.user) {
            this.user = this.$route.params.user;
        } else {
            this.user = {
                username: '',
                email: '',
                password: '',
                terms:false
            };
        }
    },

    computed: {
        formIsValid() {
            return (
                this.user.username &&
                this.user.email &&
                this.user.password &&
                this.user.terms
            )
        },
    },

    methods: {
        async save() {
            if (this.email !== null && this.password !== null) {
                await this.$store.dispatch('saveUser', this.user);
                console.log('back');
                this.$router.push('/')
            } else {
                console.log("error")
            }
        },
        resetForm() {
            this.form = Object.assign({}, this.defaultForm)
            this.$refs.form.reset()
        },
        submit() {
            this.snackbar = true
            this.resetForm()
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
