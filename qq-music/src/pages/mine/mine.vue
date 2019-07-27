<template>
  <div>
    <m-header :title="'我的'" :rightIcon="'iconMine'" @openSearch="search"></m-header>
  </div>
</template>

<script>
import MHeader from "components/m-header/m-header";
export default {
  components: {
    MHeader
  },
  methods: {
    search() {
      this.$router.push({
        name: "search"
      });
    }
  }
};
</script>

<style>
</style>
