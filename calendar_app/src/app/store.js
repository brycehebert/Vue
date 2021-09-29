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
  updateEvent(dayId, originalEventDetails, newEventDetails) {
    const eventObj = this.getEventObj(dayId, originalEventDetails);
    eventObj.details = newEventDetails;
    eventObj.edit = false;
  },
  getEventObj(dayId, eventDetails) {
    const dayObj = this.state.data.find((day) => day.id === dayId);
    return dayObj.events.find((event) => event.details === eventDetails);
  },
  deleteEvent(dayId, eventDetails) {
    const dayObj = this.state.data.find((day) => day.id === dayId);
    const eventIndexToRemove = dayObj.events.findIndex((event) => event.details === eventDetails);
    dayObj.events.splice(eventIndexToRemove, 1);
  }
};
