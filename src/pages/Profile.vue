<template>
  <div class="page page-user">
    <div class="page-header">
      <h3>用户中心 <small>profile</small></h3>
    </div>
    <div>
      <p>{{user.name}} 你好，</p>

      你可以选择：<button v-on:click="goBack">返回</button> / <button @click="submitLogout">注销</button>

      返回也可以这样写：<button @click="$router.back()">返回</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { USER_SIGNOUT } from '../store/types'

// function randomBy(under, over){
//   switch(arguments.length){
//     case 1: return parseInt(Math.random()*under + 1, 10);
//     case 2: return parseInt(Math.random()*(over - under + 1) + under, 10);
//     default: return 0;
//   }
// }

export default {
  // data() {
  //   return {
  //     // user: {
  //     //   id: randomBy(10) > 2,
  //     // },
  //   }
  // },
  computed: mapState({ user: state => state.user }),
  ready: function () {
    console.log(111)
  },
  attached: function () {},
  methods: {
    ...mapActions([USER_SIGNOUT]),

    goBack() {
      this.$router.back()
    },
    submitLogout() {
      this.USER_SIGNOUT()
      this.$router.replace({ path: '/login' })
    },
  },
  components: {},
}
</script>

<style>
.abc-demo .abc{
  margin-right: 0.5rem;
}
</style>
