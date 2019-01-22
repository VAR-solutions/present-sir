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
      component: Dashboard
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
      path: '/update',
      name: 'UpdateAttend',
      component: UpdateAttend,
      props: true,
      beforeEnter: (to, from, next) => {
        if(to.params.sub_id){
          next()
        } else{
          next({name: 'Dashboard', params: 'name'})
        }
      }
    }
  ]
})

export default router