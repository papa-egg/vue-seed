<template>
  <div>
    <el-select v-model="value" placeholder="请选择颜色" @change="colorChange">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-button type="primary" @click="showColor">提示</el-button>
    <color-board :color="color" ref="colorBoard" @clearColor="clearColor"></color-board>
  </div>
</template>

<script>
import ColorBoard from './components/color-board/ColorBoard';

export default {
  data () {
    return {
      options: [{
        value: '',
        label: '透明'
      }, {
        value: 'red',
        label: '红色'
      }, {
        value: 'green',
        label: '绿色'
      }, {
        value: 'blue',
        label: '蓝色'
      }],
      value: '',
      color: '',
    }
  },

  methods: {
    colorChange (val) {
      this.color = val;
    },
    clearColor () {
      this.value = '';
      this.color = '';
    },
    showColor () {
      this.$refs.colorBoard.showColor();
    },
  },

  components: {
    ColorBoard,
  },
}
</script>

<style scoped>

</style>
