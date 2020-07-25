import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/auth/Login'
import SignUp from '../components/auth/SignUp'
import Index from '../components/smoothies/Index'
import About from '../components/About'
import Chat from '../components/chat/Chat'
import Map from '../components/sharing/Map'
import AddSmoothie from '../components/smoothies/AddSmoothie'
import EditSmoothie from '../components/smoothies/EditSmoothie'
import Profile from "../components/sharing/Profile";

import firebase from "firebase";

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }, {
      path: '/',
      name: 'SignUp',
      component: SignUp
    }, {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        requiresAuth: true
      }

    }, {
      path: '/about',
      name: 'About',
      component: About
    }, {
      path: '/chat',
      name: 'Chat',
      component: Chat,
      meta: {
        requiresAuth: true
      },
    }, {
      path: '/map',
      name: 'Map',
      component: Map,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/add-smoothie',
      name: 'AddSmoothie',
      component: AddSmoothie,
      meta: {
        requiresAuth: true
      }

    },
    {
      path: '/edit-smoothie/:smoothie_slug',
      name: 'EditSmoothie',
      component: EditSmoothie,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile/:user_id',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    }
  ]
});


router.beforeEach((to, from, next) => {

  if (to.matched.some(() => to.meta.requiresAuth)) {
    let user = firebase.auth().currentUser;
    if (user) {
      next()
    } else {
      next({name: 'Login'})
    }
  } else {
    next()
  }
});


export default router
