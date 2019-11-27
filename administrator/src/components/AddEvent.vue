<template>
  <div>
    <sidebar/>
    <InputEvent/>
  </div>
</template>
<script>
import sidebar from "../components/Sidebar.vue";
import InputEvent from "../components/InputEvent.vue";
export default {
  name:"AddEvent",
  data: () => ({
    drawer: true
  }),
  components: {
    sidebar,
    InputEvent
  },

};
</script>