<template>
  <div>
    <p>Logging with a Reddit account is needed in order to query the API</p>
    <button v-on:click="GoToAuth()">Loging With Reddit</button>
  </div>
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

<style lang="sass" scoped>
button
  font-size: 1.5em

div
  text-align: center
</style>
