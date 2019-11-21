<template>
<v-container class="mx-auto" max-width="800" id="card">
           <v-img id="logo" :src="require('@/assets/icon.png')"></v-img>
        <p>Connect People to Environmental Activities</p>
</v-container>
</template>

<script>
export default {

}
</script>

<style>
#card{
    height: 100%;
    background-color:transparent;
    margin-top:5%;
}
h1{
    color:white
}
p{
    font-size: 30px; 
}
#logo{
    width:15%;
    height: 15%;
}
</style>
