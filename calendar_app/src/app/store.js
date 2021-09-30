import { reactive } from "@vue/reactivity";
import { seedData } from "./seed";

export const store = {
  state: {
    data: reactive(seedData)
  },
  getAllEvents() {
    fetch("http://127.0.0.1:8000/get_all")
      .then((res) => res.json())
      .then((data) => {
        this.state.data.forEach((day) => {
          data.forEach((event) => {
            if (day.id === event.dayId) {
              event.edit = false;
              day.events.push(event);
            }
          });
        });
      });
  },
  getActiveDay() {
    return this.state.data.find((day) => day.active);
  },
  setActiveDay(dayId) {
    this.state.data.map((dayObj) => (dayObj.id === dayId ? (dayObj.active = true) : (dayObj.active = false)));
  },
  submitEvent(eventDetails) {
    fetch("http://127.0.0.1:8000/add_one", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ eventDetails: eventDetails, dayId: this.getActiveDay().id })
    })
      .then((res) => res.json())
      .then((data) => {
        data.edit = false;
        const activeDay = this.getActiveDay();
        console.log(data, activeDay);
        activeDay.events.push(data);
        // activeDay.events.push({ details: eventDetails, edit: false });
      });
  },
  editEvent(dayId, eventDetails) {
    this.resetEditOfAllEvents();
    const eventObj = this.getEventObj(dayId, eventDetails);
    eventObj.edit = true;
  },
  resetEditOfAllEvents() {
    this.state.data.map((dayObj) => dayObj.events.map((event) => (event.edit = false)));
  },
  updateEvent(event, newEventDetails) {
    fetch("http://localhost:8000/update_one", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ _id: event._id, newEventDetails: newEventDetails })
    })
      .then((res) => res.json)
      .then((data) => {
        console.log(data);
        event.details = newEventDetails;
        event.edit = false;
      });
  },
  getEventObj(dayId, eventDetails) {
    const dayObj = this.state.data.find((day) => day.id === dayId);
    return dayObj.events.find((event) => event.details === eventDetails);
  },
  deleteEvent(event) {
    fetch("http://localhost:8000/delete_one", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ _id: event._id })
    })
      .then((res) => res.json)
      .then((data) => {
        const arr = this.state.data[event.dayId - 1].events;
        const index = arr.findIndex((ele) => ele._id === event._id);
        arr.splice(index, 1);

        console.log(data);
      });
  }
};
