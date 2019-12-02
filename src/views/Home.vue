<template>
  <div class="home">
    <RedditLoging />
  </div>
</template>

<script>
import RedditLoging from "@comp/RedditLoging.vue";

export default {
  name: "home",
  components: {
    RedditLoging
  }
};
</script>

<style lang="sass" scoped>
.home
  display: flex
  justify-content: center
  margin-top: 10rem
</style>
