<template>
  <div>
    <Sidebar/>
    <!-- <CardsOfEvents/> -->
    <table v-for="(event, index) in events" :key="index" v-bind:update="false" v-show="!update">
      <tbody id="tbody" style="margin-left : 20%">
        <tr style="margin-top:2%">
          <h4>{{event.dateCreated}}</h4>
          <div id="title">
            <h1>{{event.title}}</h1>
            <img v-bind:src="'http://localhost:5000/static/images/' + event.image" />
            >
            <h4>Date : {{event.dateEvent}}</h4>
            <h4>Location : {{event.address}}</h4>
            <h4>Posted by : {{event.createdBy}}</h4>
          </div>
          <hr>
          <h5>{{event.description}}</h5>
          <hr>
          <hr>
          <div id="buttons">
            <v-btn
              @click.prevent="update = true"
              @click="editEvent(event._id, event.title, event.dateEvent,event.description,event.address)"
              class="mx-2"
              fab
              dark
              large
              color="cyan"
            >
              <v-icon dark>mdi-pencil</v-icon>
            </v-btn>
            <v-btn @click="deleteEvent(event._id)" class="mx-2" fab dark large color="red">
              <v-icon dark>mdi-delete</v-icon>
            </v-btn>
          </div>
        </tr>
      </tbody>
    </table>
    <div v-show="update">
      <table>
        <v-card ref="form">
          <template>
            <v-card class="mx-auto" max-width="400">
              <!-- <Imageupload/> -->
            </v-card>
          </template>
          <h1 class="text-center">Create an Event</h1>

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
                <v-btn text color="primary" @click="this.$router.push('/admin/dashboard')">Cancel</v-btn>
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
            <v-file-input label="File input" filled prepend-icon="fas fa-camera-retro"></v-file-input>
            <v-text-field
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
            </v-slide-x-reverse-transition>
            <v-btn @click.prevent="update = false" color="primary" @click="submit" text >Update</v-btn>
          </v-card-actions>
        </v-card>
      </table>
    </div>
  </div>
</template>


<script>
import axios from "axios";
// import CardsOfEvents from "../components/CardsOfEvents.vue"
export default {
  name: "Dashboard",
  components: {
    // CardsOfEvents
  },
  data() {
    return {
      events: [],
      update: false,
      title: "",
      description: "",
      date: "",
      address: "",
      menu:'',
      id:''
    };
  },
  mounted() {
    axios.get("http://localhost:5000/event/retrieveAll").then(res => {
      this.events = res.data;
    });
  },
  methods: {
    deleteEvent(id) {
      axios.delete("http://localhost:5000/event/delete" + id).then(res => {
        axios.get("http://localhost:5000/event/retrieveAll").then(res => {
          this.events = res.data;
        });
      });
    },
    editEvent(id, title, dateEvent, description, address) {
    (this.id = id),
      (this.title = title),
        (this.date = dateEvent),
        (this.description = description),
        (this.address = address);

    },
    submit(){
      var data = {
        title: this.title,
        dateEvent: this.date,
        description: this.description,
        address: this.address
      };
      console.log(data)
      axios
        .put("http://localhost:5000/event/update" + this.id, { data })
        .then(res => {
          axios.get("http://localhost:5000/event/retrieveAll").then(res => {
            this.events = res.data;
          });
        });
    }
  }
};
</script>
<style scoped>
table {
  padding: 15px;
  /* margin-right: 15%; */
  margin-left: 15%;
  width: 70%;
  /* border-style: groove; */
  margin-top: 1%;
  background-color: white;
  border-radius: 3px;
}
table #tbody {
  border-style: groove;
}
#title {
  text-align: center;
}
#buttons {
  text-align: right;
}
</style>