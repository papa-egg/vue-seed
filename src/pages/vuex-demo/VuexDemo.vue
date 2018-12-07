<template>
  <div>
    <SetName></SetName>
    <GetName></GetName>
  </div>
</template>

<script>
import GetName from './components/get-name/GetName';
import SetName from './components/set-name/SetName';

export default {
  data () {
    return {}
  },

  components: {
    GetName,
    SetName,
  },
}
</script>

<style>

</style>
