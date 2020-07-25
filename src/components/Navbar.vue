<template>

  <nav class="indigo" role="navigation">
    <div class="nav-wrapper container">
      <router-link :to="{name:'Index'}" id="logo-container" class="brand-logo">Ninja Smoothies</router-link>
      <ul class="right hide-on-med-and-down">
        <li v-for="(link, index) in links" :key="index"
            v-if="(link.requiresAuth && user) || (link.requiresAuth===false && !user) || link.requiresAuth===null">
          <router-link v-if="!link.external" :to="{name:link.name}">{{link.text}}</router-link>
          <a v-else :href="link.external" target="_blank">{{link.text}}</a>
        </li>
        <li v-if="user">
          <a @click="logout">Logout</a>
        </li>
      </ul>
      <ul id="nav-mobile" class="sidenav">
        <li>
          <div class="user-view">
            <div class="background">
              <img src="../assets/office.jpg" alt="background">
            </div>
            <a href="#" v-if="user"><i class="material-icons circle blue center-align">person</i></a>
            <a href="#" v-if="user"><span class="white-text name">{{user.username}}</span></a>
            <a href="#" v-if="user"><span class="white-text email">{{user.email}}</span></a>
          </div>
        </li>
        <li @click="closeNav" v-for="(link, index) in links" :key="index"
            v-if="(link.requiresAuth && user) || (link.requiresAuth===false && !user) || link.requiresAuth===null">
          <router-link v-if="!link.external" class="waves-effect" :to="{name:link.name}">
            <i class="material-icons">{{link.icon}}</i>
            {{link.text}}
          </router-link>
          <a v-else :href="link.external" target="_blank">
            <i class="material-icons">{{link.icon}}</i>
            {{link.text}}
          </a>
        </li>
        <li @click="closeNav" v-if="user">
          <a @click="logout"> <i class="material-icons">exit_to_app</i> Logout</a>
        </li>
      </ul>
      <router-link v-if="this.$route.name==='Index'" :to="{name:'AddSmoothie'}"
                   class="btn-floating btn-large halfway-fab waves-effect waves-light pink">
        <i class="material-icons">add</i>
      </router-link>
      <!--Show links depending on whether the user is logged in-->
      <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
    </div>
  </nav>
</template>

<script>

    import firebase from 'firebase'

    export default {
        name: 'Navbar',
        data() {
            return {
                user: null,
                instance: null,
                links: [
                    {
                        name: 'Index',
                        text: 'Home',
                        icon: 'home',
                        requiresAuth: true
                    }, {
                        name: 'Chat',
                        text: 'Chat',
                        icon: 'chat',
                        requiresAuth: true
                    }, {
                        name: 'Map',
                        text: 'Map',
                        icon: 'map',
                        requiresAuth: true
                    }, {
                        name: 'Login',
                        text: 'Login',
                        icon: 'person',
                        requiresAuth: false
                    }, {
                        name: 'SignUp',
                        text: 'Sign up',
                        icon: 'person_add',
                        requiresAuth: false
                    }, {
                        name: 'About',
                        text: 'About',
                        icon: 'info',
                        requiresAuth: null,
                    }, {
                        name: null,
                        text: 'Github',
                        icon: 'code',
                        requiresAuth: null,
                        external: 'https://github.com/SoundousBahri/ninja-smoothie'
                    },
                ]
            }
        },
        mounted() {

            let elms = document.querySelectorAll('.sidenav');
            this.instance = M.Sidenav.init(elms, {})[0];
        },
        methods: {
            closeNav() {
                this.instance.close();
            },
            logout() {
                firebase.auth().signOut().then(() => {
                    this.$router.push({name: 'Login'})
                });
            }
        },
        created() {
            firebase.auth().onAuthStateChanged((user) => {
                this.user = user
            })
        }
    }
</script>
<style>
  @media all  and (min-width : 760px) {
    nav .btn-floating.btn-large.halfway-fab {
      right : -50px;
    }
  }
  .user-view{
    height: 163px;
  }

</style>
