<template>
<v-toolbar dense color="blue lighten-4">
    <v-toolbar-title>Eco Green |</v-toolbar-title>

    <router-link to="/homepage"><v-btn icon>
        <v-icon>mdi-home</v-icon><br/>
    </v-btn></router-link>

    <router-link to="/issues"><v-btn icon>
        <v-icon>mdi-alert</v-icon><br/>
    </v-btn></router-link>

    <router-link to='/projects'><v-btn icon>
        <v-icon>mdi-recycle</v-icon><br/>
    </v-btn></router-link>
    <v-spacer></v-spacer>

    <v-btn icon>
        <v-icon>mdi-bell</v-icon>
    </v-btn>
    <!-- <v-btn icon>
        <v-icon>mdi-face</v-icon>
        <span>{{ user.email }}</span>
    </v-btn> -->

    <v-btn>
        <span @click="logout">Logout</span>
    </v-btn>
</v-toolbar>
</template>

<script>
export default {
    props: ['user'],
    data: () => ({

    }),
    created() {
        console.log('user created');
    },
    methods: {
        logout(){
            
            sessionStorage.removeItem("authenticated")
            this.$router.go({ name: 'Login' }).catch(err => {
            console.log(err)
           
          })
        }
    }
}
</script>

<style>

</style>
