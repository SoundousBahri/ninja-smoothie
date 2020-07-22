<template>

  <nav class="indigo" role="navigation">
    <div class="nav-wrapper container">
      <router-link :to="{name:'Index'}" id="logo-container" class="brand-logo">Ninja Smoothies</router-link>
      <ul class="right hide-on-med-and-down">
        <li>
          <router-link :to="{name:'Index'}">Home</router-link>
        </li>
        <li>
          <router-link :to="{name:'Chat'}">Chat</router-link>
        </li>
        <li>
          <router-link :to="{name:'About'}">About</router-link>
        </li>
        <li><a href="https://github.com/SoundousBahri/ninja-smoothie" target="_blank">Github</a></li>
      </ul>

      <ul id="nav-mobile" class="sidenav">
        <li @click="closeNav">
          <router-link :to="{name:'Index'}">Home</router-link>
        </li>
        <li @click="closeNav">
          <router-link :to="{name:'Chat'}">Chat</router-link>
        </li>
        <li @click="closeNav">
          <router-link :to="{name:'About'}">About</router-link>
        </li>
        <li @click="closeNav"><a href="https://github.com/SoundousBahri/ninja-smoothie" target="_blank">Github</a></li>
      </ul>
      <router-link v-if="this.$route.name==='Index'" :to="{name:'AddSmoothie'}"
                   class="btn-floating btn-large halfway-fab waves-effect waves-light pink">
        <i class="material-icons">add</i>
      </router-link>
      <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
    </div>
  </nav>

  <!--
  <nav>
    <div class="nav-wrapper indigo">
      <router-link :to="{name:'Index'}" class="brand-logo">Ninja Smoothies</router-link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><router-link :to="{name:'Index'}">Home</router-link></li>
        <li><router-link :to="{name:'About'}">About</router-link></li>
        <li><a href="#" target="_blank">Github</a></li>
      </ul>
      <router-link :to="{name:'AddSmoothie'}" class="btn-floating btn-large halfway-fab waves-effect waves-light pink">
        <i class="material-icons">add</i>
      </router-link>
    </div>
  </nav>
    <ul id="slide-out" class="sidenav">
      <li>
        <div class="user-view">
          <div class="background">
            <img src="images/office.jpg">
          </div>
          <a href="#user"><img class="circle" src="images/yuna.jpg"></a>
          <a href="#name"><span class="white-text name">John Doe</span></a>
          <a href="#email"><span class="white-text email">jdandturk@gmail.com</span></a>
        </div>
      </li>
      <li><a href="#!"><i class="material-icons">cloud</i>First Link With Icon</a></li>
      <li><a href="#!">Second Link</a></li>
      <li>
        <div class="divider"></div>
      </li>
      <li><a class="subheader">Subheader</a></li>
      <li><a class="waves-effect" href="#!">Third Link With Waves</a></li>
    </ul>
    <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
-->

</template>

<script>

    export default {
        name: 'Navbar',
        data() {
            return {
                instance: null
            }
        },
        mounted() {

            let elems = document.querySelectorAll('.sidenav');
            console.log(M.Sidenav.init(elems, {}));
            this.instance = M.Sidenav.init(elems, {})[0];
        },
        methods: {
            closeNav() {
                this.instance.close();
            }
        }
    }
</script>
<style>
  @media all  and (min-width : 760px) {
    nav .btn-floating.btn-large.halfway-fab {
      right : -50px;
    }
  }

</style>
