<template>
<div>
    <v-app-bar id="appbar" dense :collapse="!collapseOnScroll"  elevate-on-scroll
      :collapse-on-scroll="collapseOnScroll" fixed>
        <v-toolbar-title>Go Eco</v-toolbar-title>
        <v-spacer></v-spacer>
    </v-app-bar>
</div>
</template>

<script>
export default {

data: () => ({
      collapseOnScroll: true,
    }),
}
</script>

<style>
#appbar{
    background-color:transparent
}

</style>
