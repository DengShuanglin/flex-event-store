const { FlexEventStore } = require("../src");
const axios = require("axios");

const eventStore = new FlexEventStore({
  state: {
    name: "test",
    friends: ["abc", "cba", "nba"],
    banners: [],
    recommends: [],
  },
  actions: {
    getHomeMultiData(ctx) {
      console.log(ctx);
      axios.get("http://123.207.32.32:8000/home/multidata").then((res) => {
        const banner = res.data.data.banner;
        const recommend = res.data.data.recommend;
        // 赋值
        ctx.banners = banner;
        ctx.recommends = recommend;
      });
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

eventStore.dispatch("getHomeMultiData");
