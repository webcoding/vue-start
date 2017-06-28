<template>
  <div class="page page-demo">
    <div>
      访问需要权限的页面，如果未登录，会自动跳转到此页面
    </div>
    <div>
      <form class="login" v-on:submit.prevent="submitLogin">
        <div class="line">
          <div v-show="btn && !form.id">id不能为空</div>
          <input type="number" placeholder="输入你的id" v-model="form.id">
        </div>
        <div class="line">
          <div v-show="btn && !form.name">用户名不能为空</div>
          <input type="text" placeholder="输入你的用户名" v-model="form.name">
        </div>
        <button>登录</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { USER_SIGNIN } from '../store/types'

export default {
  data() {
    return {
      // true 已经提交过 false 没有提交过
      btn: false,
      form: {
        id: '',
        name: '',
      },
    }
  },

  methods: {
    ...mapActions([USER_SIGNIN]),

    submitLogin() {
      this.btn = true

      if (!this.form.id || !this.form.name) return

      this.USER_SIGNIN(this.form)

      this.$router.replace({
        path: '/profile',
      })
    },
  },
}
</script>
