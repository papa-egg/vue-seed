# Vue前端种子项目

------
---- 植根于内心的修养, 以约束为前提的自由

Vue + Vuex + Vue-cli + ElementUI。 本项目主要提供一套基础、稳定的[Vue](https://cn.vuejs.org/)项目架构和统一的代码风格；<br>
针对实际项目，提供一个完整清晰的Vue脉络，并在此基础上逐步完善；<br>
整体基于[Vue-cli](https://cli.vuejs.org/zh/guide/cli-service.html)，更多方法请参考[Vue官方文档](https://cn.vuejs.org/)。

## 项目结构
创建之后，您的项目应该是这样：
```
react-seed/
  build
  config
  src/
    assets/
    pages/
    router/
    vuex/
    App.vue
    main.js
  static/
  .babelrc
  .editorconfig
  .eslintignore
  .eslintrc.js
  .gitignore
  .postcssrc.js
  index.html
  package.json
  package-lock.json
```
整体文件操作都尽可能包含于src目录下，具体功能划分如下：
* `assets`公共资源，css，js，images等
* `pages`页面.vue模板文件，采用层层嵌套方式细化各模块
* `router`最外围路由配置
* `vuex`全局的状态管理，并不提倡大范围使用，父子之间直接通信永远是最优选择
* `App.vue`根模板
* `main.js`公共入口配置中心

## 代码风格
基本模板如下：
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
      const { data } = await this.$ajax('/xxxxxxxxxxx');

      this.name = data.name;
    },
  }
}
</script>

<style>

</style>

```
采用es6编码风格，比起紧凑的代码书写，更提倡多运用空格和换行来让整体项目保持清晰，例：`<p>{{ name }}</p>`<br>
异步请求全局使用自定义ajax封装插件，方便针对项目进行自定义配置<br>
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

<style>

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
## 组件结构
```
pages/
    components/
    router-demo/
        components/
            router-page1/
                RouterPage1.vue
            router-page2/
                RouterPage2.vue
        RouterDemo.vue
```
整体组件采用由大到小，层层细化的组件嵌套方式进行构建（该结构针对大型项目固然不错，然而过犹不及，不建议嵌套过多层次造成难以理解的情况哦~）
##组件通信（vuex）
组件之间通信可以说是核心难点，父子之间直接通信永远是最优先选择，例：`<LeftBar :navList="navList"></LeftBar>`<br>
对于极少部分没有明确的关联的数据，采用`vuex`进行维护，仅做极少数据的状态管理，不提倡大规模的使用 ---- 游离于全局的变量无疑是危险的根源，不值得为贪图一时之快去大量使用<br>

`vuex`更详细demo请参考具体目录：
* `src/pages/vuex-demo`
* `vuex/`
## css规范
如果采用less作为css预处理工具，完成样式设计之余也请做好类似组件模块的清晰划分<br>
less做预处理固然方便，然而不提倡进行过多的层级嵌套（最多不要超过三层），比如：
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
### `npm dev`
在开发模式下运行
打开`http://localhost:80`在浏览器中查看它（域名端口可在`config/index.js`）中进行自定义配置<br>
如果您进行编辑，页面将重新加载<br>
### `npm build`
将用于生产的应用程序构建到“dist”文件夹下<br>
对文件进行和代码混淆<br>
构建完成后，可进行部署，将视具体情况而定
