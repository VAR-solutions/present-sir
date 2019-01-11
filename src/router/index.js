import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Home from '@/components/Home'
import AddSubject from '@/components/AddSubject'
import EditSubject from '@/components/EditSubject'

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
      component: Dashboard,
      props: true,
      beforeEnter: (to, from, next) => {
        if(to.params.name){
          next()
        } else{
          next({ name: 'Home' })
        }
      }
    },
    {
      path: '/add-subject',
      name: 'AddSubject',
      component: AddSubject,
      props: true,
      beforeEnter:(to, from, next) => {
        if(to.params.userdata){
          next()
        } else{
          next({name: 'Home'})
        }
      }
    },
    {
      path: '/edit-subject/:sub_id',
      name: 'EditSubject',
      component: EditSubject
    }
  ]
})

export default router