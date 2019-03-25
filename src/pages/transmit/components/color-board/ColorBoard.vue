<template>
  <div v-if="color">
    <div class="color-board" :style="'background:' + color"></div>
    <el-button @click="clearColor">清空颜色</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },

  props: {
    color: {
      default: '',
    },
  },

  methods: {
    clearColor () {
      this.$emit('clearColor');
    },
    showColor () {
      function getColorName (color) {
        let rel = '';

        switch (color) {
        case 'red': {
          rel = '红色';
          break;
        }
        case 'green': {
          rel = '绿色';
          break;
        }
        case 'blue': {
          rel = '蓝色';
          break;
        }
        default: {
          rel = '透明';
        }
        }

        return rel;
      }

      this.$message({
        type: 'warning',
        message: '当前颜色为' + getColorName(this.color),
      });
    },
  },
}
</script>

<style scoped>
  .color-board{
    width: 100px;
    height: 100px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
</style>
