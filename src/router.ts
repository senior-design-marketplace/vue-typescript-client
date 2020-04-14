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
      path: '/project/:id',
      name: 'project',
      meta: {
        keepAlive: false,
      },
      component: () => import('./views/Project.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        keepAlive: false,
      },
      component: () => import('./views/Dashboard.vue'),
    },
    {
      path: '/dashboard/:view',
      name: 'dashboard/view',
      meta: {
        keepAlive: false,
      },
      component: () => import('./views/Dashboard.vue'),
    },
    {
      path: '/dashboard/:view/:id',
      name: 'dashboard/view/id',
      meta: {
        keepAlive: false,
      },
      component: () => import('./views/Dashboard.vue'),
    },
    {
      path: '/myprojects',
      name: 'myprojects',
      meta: {
        keepAlive: false,
      },
      component: () => import('./views/MyProjects.vue'),
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
      path: '/invites',
      name: 'invites',
      meta: {
        keepAlive: false,
      },
      component: () => import('./views/Invites.vue'),
    },
    {
      path: '/invites/:id',
      name: 'invites/id',
      meta: {
        keepAlive: false,
      },
      component: () => import('./views/Invites.vue'),
    },
    {
      path: '/inbox',
      name: 'inbox',
      meta: {
        keepAlive: false,
      },
      component: () => import('./views/Inbox.vue'),
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
      path: '/create/:id',
      name: 'create/id',
      meta: {
        keepAlive: false,
      },
      component: () => import('./views/Create.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {
        keepAlive: false,
      },
      component: () => import('./views/Profile.vue'),
    },
    {
      path: '/profile/:id',
      name: 'profile/id',
      meta: {
        keepAlive: false,
      },
      component: () => import('./views/Profile.vue'),
    },
    {
      path: '/debug',
      name: 'debug',
      meta: {
        keepAlive: false,
      },
      component: () => import('./views/Profile.vue'),
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
