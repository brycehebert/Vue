import { reactive } from "@vue/reactivity";
import { seedData } from "./seed";

export const store = {
  state: {
    data: reactive(seedData)
  },
  getActiveDay() {
    return this.state.data.find((day) => day.active);
  },
  setActiveDay(dayId) {
    this.state.data.map((dayObj) => (dayObj.id === dayId ? (dayObj.active = true) : (dayObj.active = false)));
  },
  submitEvent(eventDetails) {
    const activeDay = this.getActiveDay();
    activeDay.events.push({details: eventDetails, edit: false});
  }
};
