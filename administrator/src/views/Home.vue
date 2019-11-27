<template>
<div>
  <Sidebar />
  <EventCard  />
</div>
</template>
<script>
import Sidebar from '../components/Sidebar.vue'
import VImageInput from 'vuetify-image-input/a-la-carte';
import EventCard from '../components/EventCard.vue';
// import InputEvent from '../components/InputEvent.vue'
export default {
  
  data: () => ({
 
    posts:[{},{}]
  }),
  components: {
    Sidebar,
    EventCard 
    // InputEvent
  },
  methods: {
  }
};
</script>