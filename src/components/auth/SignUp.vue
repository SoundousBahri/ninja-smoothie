<template>
  <div class="sign-up container">
    <div class="card">
      <div class="card-content center-align">
        <h4 class="indigo-text">Sign up</h4>
        <p class="text-accent-1">Sign up now and start creating and sharing your smoothies </p>
        <br/>
        <form @submit.prevent="signUp">
          <div class="row">
            <div class="input-field field col s12">
              <input id="email" name="email" v-model="email" type="email" class="validate">
              <label for="email" >Email</label>
              <span class="helper-text" data-error="You must provide a correct email"></span>
            </div>
          </div>

          <div class="row">
            <div class="input-field field col s12">
              <input id="username" name="username" v-model="username" type="text" class="validate"
                     :class="{'invalid':this.usernameValid!=null && !this.usernameValid}">
              <label for="username" >username</label>
              <span class="helper-text" data-error="You must provide a unique username"
                    data-success="username available"></span>
            </div>
          </div>
          <div class="row">
            <div class="input-field field col s12">
              <input id="password" minlength="6" name="password" v-model="password" type="password"
                     class="validate" @keydown="validatePassword">
              <label for="password" >Password</label>
              <span class="helper-text" data-error="password must be at least 6 characters long"></span>
            </div>
          </div>
          <div class="row">
            <div class="input-field field col s12">
              <input id="password-repeat" name="password-repeat" v-model="passwordRepeat" type="password"
                     class="validate" :class="{'invalid':passwordRepeatValid && !passwordRepeatValid}"
                     @keydown="validatePassword">
              <label for="password-repeat" >Repeat password</label>
              <span class="helper-text" data-error="password doesn't match"></span>
            </div>
          </div>
          <div class="row">
            <div class="col s12 field center-align">
              <p v-if="feedback" class="red-text">{{feedback}}</p>
              <button class="btn waves-effect waves-light" type="submit" name="action">Sign up
              </button>

              <div>
                <br/>
                <RouterLink :to="{name:'Login'}" class="grey-text pointer-cursor">Login instead?</RouterLink>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
    import slugify from 'slugify';
    import db from '../../firebase/database'
    import firebase from 'firebase'

    export default {
        name: 'SignUp',
        data() {
            return {
                slug: null,
                username: null,
                email: null,
                password: null,
                passwordRepeat: null,
                passwordRepeatValid: null,
                usernameValid: null,
                feedback: null,
            }
        },
        methods: {

            signUp() {
                this.feedback = null;
                if (this.email && this.username && this.password && this.passwordRepeat && this.passwordRepeat === this.password) {

                    this.slug = slugify(this.username, {
                        replacement: '-',
                        remove: /[$*_+~.()'"!\-:@]/g,
                        lower: true
                    });

                    let ref = db.collection('users').doc(this.slug);

                    ref.get().then((doc) => {
                        if (doc.exists) {
                            this.usernameValid = false
                        } else {
                            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                                .then(cred => {
                                    ref.set({
                                        username: this.username.charAt(0).toUpperCase() + this.username.slice(1),
                                        geolocation: null,
                                        user_id: cred.user.uid
                                    })
                                }).then(() => {
                                this.$router.push({name: 'Index'})
                            }).catch(err => {
                                this.feedback = err.message
                            })
                        }
                    })
                }

            },

            validatePassword() {
                if (this.passwordRepeat !== this.password) {
                    this.passwordRepeatValid = false;
                }
            }
        }
    }
</script>

<style>

  .sign-up {
    max-width  : 400px;
    margin-top : 60px;
  }

  .sign-up .pointer-cursor {
    cursor : pointer;
  }

  .sign-up form .row {
    margin-bottom : 0;
  }

  .sign-up form .input-field {
    margin-bottom : 0;
    margin-top    : 0;
  }
</style>
