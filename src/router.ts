import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        keepAlive: false,
      },
      component: () => import('./views/Home.vue'),
    },
    {
      path: '/my-projects',
      name: 'my-projects',
      meta: {
        keepAlive: false,
      },
      component: () => import('./views/MyProjects.vue'),
    },
    {
      path: '/create',
      name: 'create',
      meta: {
        keepAlive: false,
      },
      component: () => import('./views/Create.vue'),
    },
    {
      path: '/applications',
      name: 'applications',
      meta: {
        keepAlive: false,
      },
      component: () => import('./views/Applications.vue'),
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        keepAlive: false,
      },
      component: () => import('./views/About.vue'),
    },
    {
      path: '/account',
      name: 'account',
      meta: {
        keepAlive: false,
      },
      component: () => import('./views/Account.vue'),
    },
    {
      path: '/debug',
      name: 'debug',
      meta: {
        keepAlive: false,
      },
      component: () => import('./views/Account.vue'),
    },
    {
      path: '/project/:id',
      name: 'project',
      meta: {
        keepAlive: false,
      },
      component: () => import('./views/Project.vue'),
    },
    {
      path: '*',
      name: '404',
      meta: {
        keepAlive: false,
      },
      component: () => import('./views/NotFound.vue'),
    },
  ],
});
