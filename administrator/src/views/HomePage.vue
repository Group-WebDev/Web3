<template>
<div id="home">
    <NavBar :user="users"/>
    <v-container  class="mx-auto" id="container">
        <center><h1>Home</h1></center><br/>
        <Button/>
    </v-container>
</div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Button from '@/components/Button.vue'
export default {
    // name:'homepage',
    components: {
        NavBar,
        Button
    },
    
    computed: {
        users() {
            return this.$store.state.users;
        }
    },
    created() {
        this.$store.dispatch('getUsers');
    },
}
</script>

<style>
#container{
    padding: 5%;
    background-color: rgba(0, 0, 0, .10);
    box-shadow: 1px 1px 2px black, 0 0 25px lightblue, 0 0 5px black;
}
</style>
