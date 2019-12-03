# Vue前端种子项目

------
---- 植根于内心的修养, 以约束为前提的自由

Vue + Vuex + Vue-cli3 + ElementUI。 本项目主要提供一套基础、稳定的[Vue](https://cn.vuejs.org/)项目架构和统一的代码风格；<br>
针对实际项目，提供一套完整清晰的Vue脉络、结构；<br>
经过多年实践打磨，已作为多套项目的基本模板；<br>


## 项目结构
整体项目结构如下：
```
vue-seed/
  public
  src/
    assets/
    pages/
    router/
    vuex/
    App.vue
    main.js
  .eslintignore
  .gitignore
  babel.config.js
  package.json
  package-lock.json
  README.md
  vue.config.js

```
整体绝大部分操作都尽可能包含于src目录下，具体功能划分如下：
* `assets` 公共资源，css，js，images等
* `pages` 页面.vue模板文件，采用层层嵌套方式细化各模块
* `router` 路由配置中心
* `vuex` 全局的状态管理
* `App.vue` 根模板文件
* `main.js` 入口配置中心

## 代码风格
基础模板如下：
```js
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
      const { data } = await this.$ajax('/get_user_name', { id: 123456 });

      this.name = data.name;
    },
  }
}
</script>

<style scoped>

</style>

```
接口请求使用全局自定义ajax封装插件，放置于`/assets/js/ajax.js`并可针对实际项目进行自定义配置；<br>
采用（es6）async await语法封装使用，例：`await this.$ajax('/get_user_name', { id: 123456 })`；<br>
错误处理等业已全部包含在组件本身当中进行过滤，开发时只需对最后成功情况进行相应操作，减少重复代码；

项目整体采用es6编码风格，并用eslint进行强制规范；<br>
比起紧凑的代码书写，更提倡多运用空格和换行来让整体项目保持清晰，例：`<p>{{ name }}</p>`；<br>
## 路由
路由是单页面应用的核心，全部路由配置放置在`router/index.js`进行统一管理，除此之外，针对主要模块进行按需加载（使用`require.ensure`）来优化整体加载效率
```js

// 路由模板

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
}
</script>

<style scoped>

</style>

// router/index.js

import Vue from 'vue';
import Router from 'vue-router';

const RouterDemo = r => require.ensure([], () => r(require('@/pages/router-demo/RouterDemo.vue')), 'RouterDemo');
const RouterPage1 = r => require.ensure([], () => r(require('@/pages/router-demo/components/router-page1/RouterPage1.vue')), 'RouterPage1');
const RouterPage2 = r => require.ensure([], () => r(require('@/pages/router-demo/components/router-page2/RouterPage2.vue')), 'RouterPage2');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/router-demo',
      component: RouterDemo,
      children: [
        {
          path: '/router-demo/page1',
          component: RouterPage1,
        },
        {
          path: '/router-demo/page2',
          component: RouterPage2,
        }
      ]
    }
  ]
})
```
更多vue-router用法可以参考[vue-router文档 ](https://router.vuejs.org/)

## 数据通信
```js

// pages/transmit/Transmit.js

<color-board :color="color" ref="colorBoard" @clearColor="clearColor"></color-board>

// pages/transmit/components/color-board/ColorBoard.js

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
      ... stuff
    },
  },
}
</script>
```
组件之间通信可以说是核心难点，父子之间直接通信永远是最优先选择，例：`<color-board :color="color" ref="colorBoard" @clearColor="clearColor"></color-board>`<br>
纯粹数据只需使用props进行绑定，并且只能由父组件往子组件传递；子组件只能通过调用父组件的方法来变向操作传入数据例：`this.$emit('clearColor');`<br>
父组件也可以通过ref调用子组件方法，例：`this.$refs.colorBoard.showColor()`当然，实际这种场景并不多;

## 全局状态管理（vuex）
对于极少部分没有明确的父子关联的全局数据，采用`vuex`进行维护，例如用户名字和头像，可以统一管理操作，可以减少一些不必要的请求；<br>
vuex仅做极少数据的状态管理，不提倡大规模的使用 ---- 游离于全局的变量无疑是危险的根源，不值得为贪图一时之快去过度使用。<br>

`vuex`更详细demo请参考具体目录：
* `src/pages/vuex-demo`
* `vuex/`

## 文件（模块）引用
所有图片文件全部放置于cdn上，引用绝对路径，cdn上传地址：`https://signin.aliyun.com/fhld/login.htm`(请先找桃片开通)<br>
其它除了有明确父子关系的组件可以采用相对路径之外，都采用`@/...`做src根路径进行索引，预防模块（文件）路径变化而引发引用错误；<br>
例：`import CONFIG from '@/assets/js/config';`

## css规范
如果采用less作为css预处理工具，完成样式设计之余也请做好类似组件模块的清晰划分；<br>
less做预处理固然方便，然而不提倡进行过多的层级嵌套（最多不要超过三层），例如：
```
.leftbar{
    .leftbar-logo{
      .left-log-img{
        img{
            ...
        }
      }
    }
}

```
更提倡的方式为:
```
.leftbar{
    ...
}
.leftbar-logo{
    ...
}
.left-log-img{
    ...
}
.left-log-img img{
    ...
}
```
## 编译命令
在项目中，可以运行:
### `npm install`
下载安装所需模块
### `npm serve`
在开发模式下运行
打开`http://localhost:80`在浏览器中查看它（域名端口和其它设置可在`vue.config.js`）中进行自定义配置<br>
如果您进行编辑，页面将重新加载<br>
### `npm build`
将用于生产的应用程序构建到“dist”文件夹下<br>
对文件进行和代码混淆<br>
构建完成后，可进行部署，将视具体情况而定
