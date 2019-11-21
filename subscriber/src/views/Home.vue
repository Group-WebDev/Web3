<template>
<div id="app">
  <Carousel/>
  <Content/>
</div>
</template>

<script>
// @ is an alias to /src
import Carousel from "@/components/Common/Carousel.vue";
import Content from "@/components/Content.vue"
export default {
    components:{
      Carousel,
      Content
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