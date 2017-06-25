<template>
  <div class="header">
    <div class="inner">
      <router-link to="/" exact>
        <img class="logo" width="40" height="40" src="../assets/logo.png" alt="logo">
      </router-link>
      <router-link to="/index">首页</router-link>
      <router-link to="/profile">用户中心</router-link>
      <router-link to="/about">关于</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-header',
}
</script>
