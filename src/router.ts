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
      path: '/applications/:id',
      name: 'applications/id',
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
      path: '/notifications',
      name: 'notifications',
      meta: {
        keepAlive: false,
      },
      component: () => import('./views/Notifications.vue'),
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
      path: '/error/:type/:text',
      name: 'error',
      meta: {
        keepAlive: false,
      },
      component: () => import('./views/error.vue'),
    },
    {
      path: '*',
      name: '404',
      meta: {
        keepAlive: false,
      },
      component: () => import('./views/404.vue'),
    },
  ],
});
