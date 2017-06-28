<template>
  <transition name="fade">
    <div class="back-to-top" v-show="show" @click="backToTop">
      backtop
    </div>
  </transition>
</template>

<script>
// 还可以优化动画，从下面滑动出来
const isBrowser = typeof window !== 'undefined'
export default {
  name: 'v-backtop',
  data() {
    return {
      type: 'less',
      show: false,
    }
  },
  created() {
    var self = this
    if (isBrowser) {
      if (window.addEventListener) {
        window.addEventListener('scroll', self.handleScroll, false)
      } else if (window.attachEvent) {
        window.attachEvent('onscroll', self.handleScroll)
      } else {
        window['onscroll'] = self.handleScroll
      }
    }
  },
  beforeDestory () {
    var self = this
    if (isBrowser) {
      if (window.removeEventListener) {
        window.removeEventListener('scroll', self.handleScroll, false)
      } else if (window.detachEvent) {
        window.detachEvent('onscroll', self.handleScroll)
      } else {
        window['onscroll'] = null
      }
    }
  },
  methods: {
    backToTop() {
      if (isBrowser) {
        window.scrollTo(0, 0)
      }
    },
    handleScroll () {
      if (isBrowser) {
        this.show = (window.scrollY > 200) && true || false
      }
    },
  },
}
</script>

<style scoped>
.back-to-top{
  position: fixed;
  z-index: 10;
  right: 15px;
  bottom: 15px;
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 20px;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid #ddd;
}
</style>
