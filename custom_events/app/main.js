const emitter = mitt();

const inputComponent = {
  template: `<input :placeholder="placeholder" v-model="input" @keyup.enter="monitorEnterKey" class="input is-small" type="text" />`,
  props: ["placeholder"],
  data() {
    return {
      input: ""
    };
  },
  emits: ["add-note"],
  methods: {
    monitorEnterKey() {
      emitter.emit("add-note", {
        note: this.input,
        timestamp: new Date().toLocaleString()
      });
      this.input = "";
    }
  }
};

const noteCountComponent = {
  template: `<div class="note-count">Note count: <strong>{{ noteCount }}</strong></div>`,
  data() {
    return {
      noteCount: 0
    };
  },
  created() {
    emitter.on("add-note", event => {
      if (event.note)
        this.noteCount++;
    });
  }
};

const app = {
  data() {
    return {
      notes: [],
      timestamps: [],
      placeholder: "Enter a note"
    };
  },
  components: {
    "input-component": inputComponent,
    "note-count-component": noteCountComponent
  },
  methods: {
    addNote(event) {
      if (event.note) {
        this.notes.push(event.note);
        this.timestamps.push(event.timestamp);
      }
    }
  },
  created() {
    emitter.on("add-note", event => this.addNote(event));
  }
};

Vue.createApp(app).mount("#app");
