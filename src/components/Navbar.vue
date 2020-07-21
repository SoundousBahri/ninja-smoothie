<template>

  <nav>
    <div class="nav-wrapper indigo">
      <router-link :to="{name:'Index'}" class="brand-logo">Ninja Smoothies</router-link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="sass.html">Sass</a></li>
        <li><a href="badges.html">Components</a></li>
        <li><a href="collapsible.html">JavaScript</a></li>
      </ul>
      <router-link :to="{name:'AddSmoothie'}" class="btn-floating btn-large halfway-fab waves-effect waves-light pink">
        <i class="material-icons">add</i>
      </router-link>
    </div>
  </nav>
</template>


<script>

  export default {
      name:'Navbar',
      data(){
          return{

          }
      }
  }
</script>
<style>
  nav .brand-logo{
    padding: 0 20px;
  }
</style>
