<template>
  <div class="day-event" :style="getEventBackgroundColor">
    <div v-if="!event.edit">
      <span class="has-text-centered details">{{ event.details }}</span>
      <div class="has-text-centered icons">
        <i
          class="fa fa-pencil-square edit-icon"
          @click.stop="editEvent(event)"
        ></i>
        <i
          class="fa fa-trash-o delete-icon"
          @click.stop="deleteEvent(event)"
        ></i>
      </div>
    </div>
    <div v-if="event.edit">
      <input
        type="text"
        :placeholder="event.details"
        v-model="newEventDetails"
        @click.stop
      />
      <div class="has-text-centered icons">
        <i
          class="fa fa-check"
          @click.stop="updateEvent(event, newEventDetails)"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../store";

export default {
  name: "CalendarEvent",
  props: ["event", "day"],
  computed: {
    getEventBackgroundColor() {
      const colors = ["#FF9999", "#85D6FF", "#99FF99"];
      let randomColor = colors[Math.floor(Math.random() * colors.length)];
      return `background-color: ${randomColor}`;
    },
  },
  methods: {
    editEvent(event) {
      store.editEvent(event);
    },
    updateEvent(event, updatedEventDetails) {
      if (updatedEventDetails === "") {
        event.edit = false;
        return;
      }
      store.updateEvent(event, updatedEventDetails);
      this.newEventDetails = "";
    },
    deleteEvent(event) {
      store.deleteEvent(event);
    },
  },
  data() {
    return {
      newEventDetails: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.day-event {
  margin-top: 6px;
  margin-bottom: 6px;
  display: block;
  color: #4c4c4c;
  padding: 5px;

  .details {
    display: block;
  }

  .icons .fa {
    padding: 0 2px;
  }

  input {
    background: none;
    border: 0;
    border-bottom: 1px solid #fff;
    width: 100%;

    &:focus {
      outline: none;
    }
  }
}
</style>