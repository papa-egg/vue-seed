<template>
  <div>
    <p>当前用户名为：{{ userName }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },

  computed: {
    userName () {
      return this.$store.getters.getUserName;
    },
  },
}
</script>

<style>

</style>
