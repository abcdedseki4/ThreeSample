<template>
  <div class="home">
    <Welcome msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Welcome from "../components/Welcome.vue"; // @ is an alias to /src

@Component({
  components: {
    Welcome,
  },
})
export default class Home extends Vue {}
</script>
<style lang="scss">
.home {
  width: 100%;
}
</style>
