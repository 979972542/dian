export default {
  namespaced: true,
  state: [
    {
      title: "手机",
    },
    {
      title: "电脑",
    },
    {
      title: "上衣",
    },
    {
      title: "裤子",
    },
    {
      title: "鞋子",
    },
    {
      title: "零食",
    },
    {
      title: "水杯",
    },
    {
      title: "玩具",
    },
  ],
  mutations: {
    setClass(state, val) {
      state.push(val);
    },
    updata(state, val) {
      state.splice(val, 1);
    },
    change(state, val) {
      state[val.index].title = val.val;
    },
  },
  actions: {
    setClass({ commit }, val) {
      commit("setClass", val);
    },
    updata({ commit }, val) {
      commit("updata", val);
    },
    change({ commit }, val) {
      commit("change", val);
    },
  },
};
