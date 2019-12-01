<template>
  <p>Authorizing with Reddit...</p>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";

const namespace = "Reddit";

@Component
export default class RedditOauth extends Vue {
  @Action("GetToken", { namespace }) getToken: any;

  async mounted() {
    // Authorization code comes as query paramter from Reddit redirect
    this.getToken(this.$route.query.code);
  }
}
</script>
