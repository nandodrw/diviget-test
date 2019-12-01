<template>
  <div>
    <section id="post-list">
      <h1>Mew</h1>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";

const namespace = "Reddit";

@Component
export default class Posts extends Vue {
  @Action("GetPosts", { namespace }) getPosts: any;

  mounted() {
    this.getPosts();
  }
}
</script>
