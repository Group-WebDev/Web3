
<template>
  <v-row justify="center" >
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card ref="form">
        <h1 class="center">Create an Event</h1>
        <v-card-text>
          <v-text-field
              ref="name"
              v-model="title"
              prepend-icon="fas fa-file"
              label="Title"
              placeholder="Title for the event"
              required
            ></v-text-field>
            <!-- <v-col cols="12" sm="6" md="4"> -->
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                label="Pick a Date"
                prepend-icon="fas fa-calendar-alt"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
           <v-textarea
          name="input-7-1"
          filled
          placeholder="Description of the event"
          prepend-icon="fas fa-file-alt"
          label="Description"
          v-model="description"
          auto-grow
        ></v-textarea>
        
        <v-file-input
          label="File input"
          filled
          prepend-icon="fas fa-camera-retro"
        ></v-file-input>
        <v-text-field
              ref="name"
              v-model="address"
              prepend-icon="fas fa-map-marker-alt"
              label="Venue"
              placeholder="Venue"
              required
        ></v-text-field>

        </v-card-text>
        <v-divider class="mt-12"></v-divider>


        
        <v-card-actions>
          <v-btn text>Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip
              v-if="formHasErrors"
              left
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  class="my-0"
                  @click="resetForm"
                  v-on="on"
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn color="primary" text @click="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>

</template>

<style>

</style>

<script>
import axios from 'axios'
// import Imageupload from "../components/imageupload.vue"
  export default {
    name:"InputEvent",
    data: () => ({
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      name: null,
      title: null,
      address: null,
      description : null,
      formHasErrors: false,
       rotation: 0,
            scale: 1,
            borderRadius: 0
    }),
    components:{
      // Imageupload
    },

    computed: {
      form () {
        return {
          name: this.name,
          address: this.address,
          
        }
      },
    },
  
    watch: {
      name () {
        this.errorMessages = ''
      },
    },

    methods: {
      
 saveClicked: function saveClicked() {
            var img = this.$refs.vueavatar.getImageScaled();
            this.$refs.image.src = img.toDataURL();
        },
        onImageReady: function onImageReady() {
            this.scale = 1;
            this.rotation = 0;
        },
      addressCheck () {
        this.errorMessages =  !this.name
          ? 'Hey! I\'m required'
          : ''

        return true
      },
      resetForm () {
        this.errorMessages = []
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          this.$refs[f].reset()
        })
      },
      submit () {
        alert(this.title + this. address + this.description + this.date)
        if(this.title && this.address && this.date && this.description != null){
            alert('not null')
            var data = {
              title : this.title,
              dateevent : this.date,
              description : this.description,
              address : this.address
            }
            console.log(data)
        axios
          .post('http://localhost:3000/event/create', {data})
          .then(res =>{
            alert('nice one')
            this.$router.push('/dashboard')
          })
          .catch(err =>{
            alert('error!')
          })
        }else{
          alert("fill all the given fields")
        }

      },
    },
  }
</script>
<style>
h1{
  color:"black"
}
</style>

