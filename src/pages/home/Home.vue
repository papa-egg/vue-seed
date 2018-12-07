<template>
  <div>
    <p>{{ name }}</p>
    <button @click="getUserName" >点击获取用户名</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
    }
  },

  methods: {

    // get the user name
    async getUserName () {
      const { data } = await this.$ajax('/xxxxxxxxxxx');

      this.name = data.name;
    },
  }
}
</script>

<style>

</style>
