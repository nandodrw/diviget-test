<template>
  <div class="post-preview">
    <div class="caption">
      <span class="big white left">{{ post.author }}</span> 
      <span class="medium white">{{ post.entryDate }}</span>
    </div>
    <div class="image">
      <div class="thumbnail" v-bind:style="imageBg"></div>
      <div class="small white">{{ post.title }}</div>
      <button>></button>
    </div>
    <div class="caption">
      <span><button>Dismiss Post</button></span>
      <span class="medium light-red">{{ post.comments }} comments</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { RedditPost } from "@/types";

@Component
export default class Post extends Vue {
  @Prop(Object)
  post!: RedditPost;

  get imageBg() {
    return {
      backgroundImage: `url(${this.post.thumbnail.uri})`,
      height: `${this.post.thumbnail.height}px`,
      width: `${this.post.thumbnail.width}px`
    };
  }
}
</script>

<style lang="sass" scoped>
.post-preview
  padding: 4px
  box-sizing: border-box

span
  display: inline-block

.post-preview
  background-color: black

.thumbnail
  background-size: cover

.white
  color: #fff

.light-red
  color: red

.small
  font-size: 0.8em

.medium
  font-size: 0.9em

.big
  font-size: 1.2em

.caption span
  width: 50%
  overflow: hidden
  text-overflow: clip
  text-align: left
  padding-left: 4px
  box-sizing: border-box

.image
  display: flex
  flex-direction: row
  align-items: center
  justify-content: space-between
</style>
