<template>
  <div>
    <section id="post-list-section">
      <h1>Reddit's Posts</h1>
      <ul class="post-list">
        <li v-for="post in postsList" v-bind:key="post.name">
          <Post v-bind:post="post"></Post>
        </li>
      </ul>
    </section>
    <section id="post-detail">
      <p>Post Detail</p>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { RedditPost } from "@/types";
import Post from "@comp/Post.vue";

const namespace = "Reddit";

@Component({
  components: {
    Post
  }
})
export default class Posts extends Vue {
  @Action("GetPosts", { namespace }) getPosts: any;
  @Getter("Posts", { namespace }) postsList: Array<RedditPost> | undefined;

  mounted() {
    this.getPosts();
  }
}
</script>

<style lang="sass" scoped>
#post-list-section
  float: left
  width: 30%

#post-detail
  float: left
  width: 70%

.post-list
  list-style: none
  margin-top: 0
  margin-left: 0
  margin-right:0
  padding: 0

li
  margin-bottom: 2px
</style>
