import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Home from '@/components/Home'
import firebase from 'firebase/app'
import 'firebase/auth'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
})

router.beforeEach((to,from,next) =>{
  if(to.matched.some(rec => rec.meta.requiresAuth)){
    let user = firebase.auth().currentUser
    if(user){
      next()
    }else{
      next({ name: 'Home' })
    }
  }else{
    next()
  }
})
export default router
