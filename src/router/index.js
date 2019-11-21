import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        name: 'recipesList',
        component: () => import('../views/RecipeList.vue')
      },
      {
        path: '/recipes/:id',
        name: 'recipeDetails',
        component: () => import('../views/RecipeList.vue'),
        meta: {
          details: true,
        }
      }
    ]
  },
  {
    path: '*',
    redirect: { name: 'recipesList' },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
