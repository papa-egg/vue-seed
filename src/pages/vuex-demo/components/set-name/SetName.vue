<template>
  <div>
    <input v-model="userName" placeholder="请输入">
    <button @click="setName">确定</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userName: '',
    }
  },

  methods: {
    setName () {
      this.$store.dispatch('setUserName', this.userName);
      this.userName = '';
    },
  },
}
</script>

<style>

</style>
