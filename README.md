# flex-event-store

<!-- 感谢coderwhy老师的细致讲解 -->

An event-based global state management tool for vue, react, mini-program, etc.

一个基于事件的全局状态管理工具，可以在Vue、React、小程序等任何地方使用。





# 设计灵感

在项目中找到一个更加方便快捷的数据共享方案：

* 后续会完善文档和增加更多好用功能；
* 欢迎star、issue、pull requests，会进行更多改变；



# 如何使用呢？

## 1、npm安装依赖

```shell
npm install flex-event-store
```



## 2、事件总线（event-bus）

```js
const { FlexEventBus } = require('flex-event-store')

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

```





## 3、数据共享（event-store）

```js
const { FlexEventStore } = require("flex-event-store")
const axios = require('axios')

const eventStore = new FlexEventStore({
  state: {
    name: "test",
    friends: ["abc", "cba", "nba"],
    banners: [],
    recommends: [],
  },
  actions: {
    getData(ctx) {
      console.log("ctx", ctx);
      // test code
      // axios.get("url").then((res) => {
      //   const banner = res.data.banner;
      //   const recommend = res.data.recommend;
      //
      //   ctx.banners = banner;
      //   ctx.recommends = recommend;
      // });
    },
  },
});

// 数据监听
eventStore.onState("name", (value) => {
  console.log("监听name:", value);
});

eventStore.onState("friends", (value) => {
  console.log("监听friends:", value);
});

eventStore.onState("banners", (value) => {
  console.log("监听banners:", value);
});

eventStore.onState("recommends", (value) => {
  console.log("监听recommends", value);
});

// 数据变化
setTimeout(() => {
  eventStore.setState("name", "temp");
  eventStore.setState("friends", ["kobe", "james"]);
}, 1000);

eventStore.dispatch("getData");
```



