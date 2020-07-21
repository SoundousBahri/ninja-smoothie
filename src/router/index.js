import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import About from '@/components/About'
import AddSmoothie from '@/components/AddSmoothie'
import EditSmoothie from '@/components/EditSmoothie'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }, {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/add-smoothie',
      name: 'AddSmoothie',
      component: AddSmoothie
    },
    {
      path: '/edit-smoothie/:smoothie_slug',
      name: 'EditSmoothie',
      component: EditSmoothie
    }
  ]
})
