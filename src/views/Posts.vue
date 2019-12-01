<template>
  <div>
    <section id="post-list">
      <h1>Mew</h1>
      <ul id="example-1">
        <li v-for="post in postsList" v-bind:key="post.name">
          {{ post.title }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { RedditPost } from "@/types";

const namespace = "Reddit";

@Component
export default class Posts extends Vue {
  @Action("GetPosts", { namespace }) getPosts: any;
  @Getter("Posts", { namespace }) postsList: Array<RedditPost> | undefined;

  mounted() {
    this.getPosts();
  }
}
</script>
