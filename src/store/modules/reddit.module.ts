import { Module } from "vuex";
import { RedditState, RootState, RedditPost } from "@/types";
import RedditService from "@services/reddit.service";
import router from "@/router";

const Reddit: Module<RedditState, RootState> = {
  namespaced: true,

  state: {
    // A valid token should be used on each query to reddit api
    token: "",
    posts: [],
    lastPostName: "",
    postPerRequest: 25
  },

  getters: {
    Posts: state => state.posts
  },

  mutations: {
    SetToken(state, payload: string) {
      state.token = payload;
    },

    AddPost(state, payload: RedditPost) {
      state.posts.push(payload);
    }
  },

  actions: {
    // This action is used to finalize the oauth authorization flow
    async GetToken({ commit }, authorizationCode: string) {
      const token = await RedditService.GetAuthorizationToken(
        authorizationCode
      );
      commit("SetToken", token);
      router.push("/posts");
    },

    // This mutation get Top post from reddit and committed them to app state
    async GetPosts({ commit, state }) {
      if (!state.token) {
        router.push("/");
        return;
      }
      const rawPosts = await RedditService.GetDataFromListingEndpoint(
        "top",
        state.token
      );
      for (let index = 0; index < rawPosts.data.children.length; index++) {
        const parsedPost = RedditService.ParseRawPost(
          rawPosts.data.children[index].data
        );
        if (!parsedPost || parsedPost == null) continue;
        commit("AddPost", parsedPost);
      }
    }
  }
};

export default Reddit;
