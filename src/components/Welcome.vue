<template>
  <div class="welcome container">
    <div class="card">
      <div class="card-content center-align">
        <h4 class="indigo-text">Welcome</h4>
        <p class="text-accent-1">Login now and start creating and sharing your smoothies </p>
        <form @submit.prevent="login">
          <div class="row">
            <div class="input-field field col s12">
              <input id="name" name="name" v-model="name" type="text" class="validate active">
              <label for="name">Enter your name</label>
            </div>
          </div>
          <div class="row">
            <div class="col s12 field center-align">
              <p v-if="feedback" class="red-text">{{feedback}}</p>
              <button class="btn waves-effect waves-light" type="submit" name="action">Enter website
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  </div>

</template>

<script>
    export default {
        name: 'Welcome',
        data() {
            return {
                name: null,
                feedback: null
            }
        },
        methods: {
            login() {

                this.feedback = null;
                if (this.name) {
                    this.$router.push({name: 'Chat', params: {name: this.name}})
                } else {
                    this.feedback = 'You must enter a name to start'
                }
            }
        }
    }
</script>

<style>

  .welcome {
    max-width  : 400px;
    margin-top : 100px;
  }

</style>
