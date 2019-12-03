import Vue from 'vue';
import Router from 'vue-router';

const Home = r => require.ensure([], () => r(require('@/pages/home/Home.vue')), 'Home');
const VuexDemo = r => require.ensure([], () => r(require('@/pages/vuex-demo/VuexDemo.vue')), 'VuexDemo');
const Transmit = r => require.ensure([], () => r(require('@/pages/transmit/Transmit.vue')), 'Transmit');
const RouterDemo = r => require.ensure([], () => r(require('@/pages/router-demo/RouterDemo.vue')), 'RouterDemo');
const RouterPage1 = r => require.ensure([], () => r(require('@/pages/router-demo/components/router-page1/RouterPage1.vue')), 'RouterPage1');
const RouterPage2 = r => require.ensure([], () => r(require('@/pages/router-demo/components/router-page2/RouterPage2.vue')), 'RouterPage2');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/vuex-demo',
      component: VuexDemo,
    },
    {
      path: '/transmit',
      component: Transmit,
    },
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
    },
    {
      path: '/*',
      component: Home,
    },
  ]
})
