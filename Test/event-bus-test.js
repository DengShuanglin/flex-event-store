const { FlexEventBus } = require("../src");

const eventBus = new FlexEventBus();

const eventCallback1 = (...payload) => {
  console.log("eventCallback1:", payload);
};

const eventCallback2 = (...payload) => {
  console.log("eventCallback2:", payload);
};

const sampleCallback1 = (...payload) => {
  console.log("sampleCallback1:", payload);
};

eventBus.on("event", eventCallback1);
eventBus.on("event", eventCallback2);
eventBus.on("sample", sampleCallback1);
eventBus.once("event", (...payload) => {
  console.log("event once:", payload);
});

setTimeout(() => {
  eventBus.emit("event", "abc", "cba", "nba");
  eventBus.emit("sample", "abc", "cba", "nba");
}, 1000);

setTimeout(() => {
  eventBus.off("event", eventCallback1);
  eventBus.off("sample", sampleCallback1);
}, 2000);

setTimeout(() => {
  eventBus.emit("event");
  eventBus.emit("sample");
}, 3000);
