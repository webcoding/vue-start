<template>
  <div class="layout">
    <v-header></v-header>
    <router-view class="page"></router-view>
  </div>
</template>

<script>
import vHeader from '@/components/vHeader'
export default {
  name: 'layout',
  components: {
    vHeader,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">

</style>
