import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'BioGears',
    component: () => import(/* webpackChunkName: "BioGears" */ '../views/BioGearsView.vue')
  },
  {
    path: '/About',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/MoHSES',
    name: 'MoHSES',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "MoHSES" */ '../views/MoHSESView.vue')
  },
  {
    path: '/VisualizationTool',
    name: 'VisualizationTool',
    component: () => import(/* webpackChunkName: "MoHSES" */ '../views/PlottingView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
