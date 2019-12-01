import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { RootState } from "@/types";
import Reddit from "@/store/modules/reddit.module";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: 1
  },
  mutations: {},
  actions: {},
  modules: {
    Reddit
  }
};

export default new Vuex.Store(store);
