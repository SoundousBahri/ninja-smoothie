import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Index from '@/components/Index'
import About from '@/components/About'
import Chat from '@/components/Chat'
import AddSmoothie from '@/components/AddSmoothie'
import EditSmoothie from '@/components/EditSmoothie'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    }, {
      path: '/smoothies',
      name: 'Index',
      component: Index,

    }, {
      path: '/about',
      name: 'About',
      component: About
    }, {
      path: '/chat',
      name: 'Chat',
      component: Chat,
      props: true,
      beforeEnter: (to, from, next) => {
        if (to.params.name) {
          next()
        } else {
          next({name: 'Welcome'})
        }
      }
    },
    {
      path: '/add-smoothie',
      name: 'AddSmoothie',
      component: AddSmoothie,

    },
    {
      path: '/edit-smoothie/:smoothie_slug',
      name: 'EditSmoothie',
      component: EditSmoothie,
    }
  ]
})
