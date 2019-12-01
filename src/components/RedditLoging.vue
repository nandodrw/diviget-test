<template>
  <button v-on:click="GoToAuth()">Logging With Reddit</button>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import reddit from "@services/reddit.service";

@Component
export default class RedditLoging extends Vue {
  GoToAuth() {
    reddit.Authorize();
  }
}
</script>
