<template>
  <v-app>
    <Header style="margin-top:5%:" v-if="$route.name !== 'login'"></Header>
    <!-- <Sidebar /> -->  
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>
<style>

</style>

<script>
export default {
  name: "App",
};
</script>