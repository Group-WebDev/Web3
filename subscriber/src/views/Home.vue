<template>
<div id="app">
    <Carousel />
    <v-container>
        <Events />
    </v-container>
</div>
</template>

<script>
// @ is an alias to /src
import Carousel from "@/components/Common/Carousel.vue";
import Events from "@/components/Events.vue"
export default {
    components: {
        Carousel,
        Events
    }
}
</script>

<!-- <v-container>
    <v-row>
      <v-col cols="4" v-for="(cat,idx) in cats" :key="idx">
        <Content :cat="cat" />
      </v-col>
    </v-row>
  </v-container> -->
