import VueRouter from 'vue-router'
import HomeComponent from '../components/HomeComponent.vue';
import LoginComponent from '../components/LoginComponent.vue';
import InventoryComponent from '../components/InventoryComponent.vue';
import SignupComponent from '../components/SignupComponent.vue';

const routes = [
  {
    path: '/home',
    component: HomeComponent,
    children: [{
      path: '/',
      component: InventoryComponent
    }, {
      path: '/sale',
      component: InventoryComponent
    }, {
      path: '/profile',
      component: InventoryComponent
    }]
  },
  {
    path: '/',
    component: LoginComponent
  },
  {
    path: '/signup',
    component: SignupComponent
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
