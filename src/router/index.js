import Vue from 'vue'
import Router from 'vue-router'
import Env from '../setting/env'

Vue.use(Router)

// route-level code splitting
import Layout from './Layout'
import Index from '@/pages/Index'
const Login = () => import('@/pages/Login')
const Profile = () => import('@/pages/Profile')
const About = () => import('@/pages/About')
// const createListView = id => () => import('../views/CreateListView').then(m => m.default(id))

export function createRouter () {
  return new Router({
    debug: Env.debug,
    mode: Env.routerMode,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      {
        path: '/',
        component: Layout,
        children: [
          { path: '/', component: Index, alias: 'index' },
          { path: '/login', component: Login },
          { path: '/profile', component: Profile, meta: { auth: true } },
          { path: '/about', component: About },
        ],
      },
      // { path: '/top/:page(\\d+)?', component: createListView('top') },
      // { path: '/new/:page(\\d+)?', component: createListView('new') },
      // { path: '/show/:page(\\d+)?', component: createListView('show') },
      // { path: '/ask/:page(\\d+)?', component: createListView('ask') },
      // { path: '/job/:page(\\d+)?', component: createListView('job') },
      // { path: '/item/:id(\\d+)', component: ItemView },
      // { path: '/user/:id', component: UserView },
      // { path: '/', redirect: '/top' }
    ]
  })
}
