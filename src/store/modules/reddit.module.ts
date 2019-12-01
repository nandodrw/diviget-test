import { Module } from "vuex";
import { RedditState, RootState } from "@/types";
import RedditService from "@services/reddit.service";

const Reddit: Module<RedditState, RootState> = {
  namespaced: true,
  state: {
    // A valid token should be used on each query to reddit api
    token: "",
    posts: [],
    lastPostName: "",
    postPerRequest: 25
  },
  mutations: {
    SetToken(state, payload: string) {
      state.token = payload;
    }
  },
  actions: {
    // This action is used to finalize the oauth authorization flow
    async GetToken({ commit }, authorizationCode: string) {
      const token = await RedditService.GetAuthorizationToken(
        authorizationCode
      );
      commit("SetToken", token);
    }
  }
};

export default Reddit;
