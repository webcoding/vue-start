<template>
  <section class="layout">
    <v-header></v-header>
    <router-view class="page"></router-view>
  </section>
</template>

<script>
import vHeader from '@/components/vHeader'
export default {
  name: 'layout',
  components: {
    vHeader,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">

</style>
