import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Home from '@/components/Home'
import AddSubject from '@/components/AddSubject'
import EditSubject from '@/components/EditSubject'
import UpdateAttend from '@/components/UpdateAttend'
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
      path: '/edit-subject',
      name: 'EditSubject',
      component: EditSubject,
      props: true,
      beforeEnter:(to, from, next) => {
        if(to.params.sub_id){
          next()
        } else{
          next({name:'Home'})
        }
      }
    },
    {
      path: '/update/:sub_id',
      name: 'UpdateAttend',
      component: UpdateAttend
    }
  ]
})

export default router