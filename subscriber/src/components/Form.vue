<template>
<div>
    <v-dialog v-model="dialog" persistent  width="6000">
        <template v-slot:activator="{on}">
            <v-btn v-on="on" color="primary" v-show="!isSubscribe">Join</v-btn>
        </template>
        <v-card class="mx-auto card" max-width="500">
            <v-container>
                <center>
                    <div v-show="isSubscribe">
                        <v-btn icon @click="dialog = false" class="float-right">
                            <v-icon>mdi-close</v-icon>
                        </v-btn><br/>
                        <h1>Welcome To</h1>
                        <p>Your Email will sent to Admin For more Conversations about activities</p>
                    </div>
                    <v-img :src="require('@/assets/logos.png')" id="image"></v-img>
                </center>
                <v-form ref="form" @submit.prevent="subscribe" v-show="!isSubscribe" v-model="formIsValid">
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="firstname" :rules="[rules.required , rules.name]" label="First name" required></v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field v-model="lastname" :rules="[rules.required , rules.name]" label="Last name" required></v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field v-model="middlename" :rules="[rules.required , rules.name]" label="Middle Name" required></v-text-field>
                            </v-col>
                        </v-row>
                        <v-text-field v-model="email" :rules="[rules.required, rules.email]" label="E-mail"></v-text-field>
                        <v-text-field v-model="address" :rules="[rules.required]" label="Address"></v-text-field>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                            <v-btn color="blue darken-1" :disabled="!formIsValid" text @click="subscribe">Join</v-btn>
                        </v-card-actions>
                    </v-container>
                </v-form><br />
            </v-container>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
// import axios from "axios";
import {
    createUser
} from '@/components/Repository.js'
export default {
    data() {
        return {
            dialog: false,
            formIsValid:false,
            isSubscribe: false,
            firstname: '',
            lastname: '',
            middlename: '',
            email: '',
            address: '',
            rules: {
                required: value => !!value || 'Required.',
                email: value => {
                    const pattern = /(\W|^)[\w.+\-]*@gmail\.com(\W|$)/
                    return pattern.test(value) || 'Invalid e-mail.'
                },
                name:value=>{
                    const pattern = /^[a-zA-Z]+(([\'\,\.\- ][a-zA-Z ])?[a-zA-Z]*)*$/
                    return pattern.test(value) || "Name Not Contain Numbers and Special Characters except Dot, Comma, Apostrophe, and Dash"
                }
            }
        }
    },
    methods: {
        subscribe: function () {
            this.isSubscribe = true;
            let data = {
                firstname: this.firstname,
                lastname: this.lastname,
                middlename: this.middlename,
                email: this.email,
                address: this.address
            }
            createUser(data)
                .then(data => {
                    this.$emit('createUser', data.data);
                    this.username = ""
                    localStorage.setItem('subscriber', data.data)
                })
                .catch(err => alert(err.message))
        }
    },
    // computed: {
    //     formIsValid() {
    //         return (
    //             this.firstname &&
    //             this.lastname &&
    //             this.middlename &&
    //             this.address &&
    //             this.email

    //         )
    //     },
    // },
}
</script>

<style scoped>
#image {
    width: 30%;
    height: 30%;
}

h1 {
    color: green;
}
</style>
