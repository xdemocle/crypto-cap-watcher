import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/dashboard'
import NotFound from './views/not-found'

Vue.use(Router)

const appRouter = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Dashboard
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound
    }
  ]
})

// appRouter.beforeEach((to, from, next) => {
//   if (to.meta.auth) {
//     if (Auth.isSessionNotValid()) {
//       return Auth.logout()
//     }
//   }

//   next()
// })

export default appRouter
