<template>
<div>
<v-dialog v-model="dialog" width="9000">
    <template v-slot:activator="{on}">
        <v-btn v-on="on" color="primary" v-show ="!isSubscribe" >Join</v-btn>
    </template>
    <v-card class="mx-auto card" max-width="500">
        <v-container>
            <center>
             <h1 v-show="isSubscribe">Welcome To</h1>
                <v-img :src="require('@/assets/go-eco.png')" id="image"></v-img>
            </center>
            <form id="form" @submit.prevent="subscribe" v-show="!isSubscribe">
                <v-container>
                    <v-text-field v-model="username" :rules="[rules.required]" label="Username"></v-text-field>
                    <v-text-field v-model="email" :rules="[rules.required, rules.email]" label="E-mail"></v-text-field>
                    <v-text-field v-model="address" :rules="[rules.required]" label="Address"></v-text-field>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" :disabled="!formIsValid" text @click="subscribe">Join</v-btn>
                    </v-card-actions>
                </v-container>
            </form><br />
        </v-container>
    </v-card>
</v-dialog>
</div>
</template>

<script>
// import axios from "axios";
import {createUser} from '@/components/Repository.js'
export default {
    data() {
        return {    
            dialog: false,
            isSubscribe: false,
                username: '',
                email: '',
                address: '',
            rules: {
                required: value => !!value || 'Required.',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                },
            }
        }
    },
    methods: {
        subscribe: function () {
            this.isSubscribe = true;
            let data = {username:this.username, email:this.email, address:this.address}
            createUser(data)
                .then(data=>{
                    this.$emit('creatUser', data.data);
                    this.username =""
                    localStorage.setItem('subscriber', data.data)
                })
                .catch(err=>alert(err.message))
        }
    },
    computed: {
        formIsValid() {
            return (
                this.username &&
                this.address &&
                this.email 
                
            )
        },
    },
}
</script>

<style scoped>
#image {
    width: 40%;
    height: 40%;
}
h1{
    color:green;
}
</style>
