<template>
  <div class="login container">
    <div class="card">
      <div class="card-content center-align">
        <h4 class="indigo-text">Login</h4>
        <p class="text-accent-1">Login now and start creating and sharing your smoothies </p>
        <br/>
        <form @submit.prevent="login">
          <div class="row">
            <div class="input-field field col s12">
              <input id="email" name="email" v-model="email" type="email" class="validate">
              <label for="email">Email</label>
              <span class="helper-text" data-error="You must provide a correct email"></span>
            </div>
          </div>
          <div class="row">
            <div class="input-field field col s12">
              <input id="password" minlength="6" name="password" v-model="password" type="password"
                     class="validate">
              <label for="password">Password</label>
              <span class="helper-text" data-error="password must be at least 6 characters long"></span>
            </div>
          </div>
          <div class="row">
            <div class="col s12 field center-align">
              <p v-if="feedback" class="red-text">{{feedback}}</p>
              <button class="btn waves-effect waves-light" type="submit" name="action">Login
              </button>
              <div>
                <br/>
                <RouterLink :to="{name:'SignUp'}" class="grey-text pointer-cursor">Don't have an account? Sign up
                </RouterLink>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

    import firebase from 'firebase'
    import slugify from 'slugify';
    import db from '../../firebase/database'

    export default {
        name: 'Login',
        data() {
            return {
                email: null,
                password: null,
                feedback: null,
            }
        },
        methods: {

            login() {
                this.feedback = null;
                if (this.email && this.password) {


                    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                        .then(() => {
                            this.$router.push({name: 'Index'})
                        })
                        .catch(err => {
                            this.feedback = err.message
                        })
                }


            },
            createUser(emails, index, usersData) {
                let e = emails[index];
                firebase.auth().createUserWithEmailAndPassword(e.email, 'EG8f,grDS85!E5T5ojgY:')
                    .then(cred => {
                        let slug = slugify(usersData[index].username, {
                            replacement: '-',
                            remove: /[$*_+~.()'"!\-:@]/g,
                            lower: true
                        });

                        db.collection('users').doc(slug).set({
                            username: usersData[index].username.charAt(0).toUpperCase() + usersData[index].username.slice(1),
                            geolocation: {
                                lng: usersData[index].lng,
                                lat: usersData[index].lat
                            },
                            user_id: cred.user.uid
                        });
                        this.createUser(emails, ++index, usersData)

                    }).catch(err => {
                    this.feedback = err.message
                })
            }
        }
    }
</script>

<style>

  .login {
    max-width  : 400px;
    margin-top : 60px;
  }

  .login .pointer-cursor {
    cursor : pointer;
  }

  .login form .row {
    margin-bottom : 0;
  }

  .login form .input-field {
    margin-bottom : 0;
    margin-top    : 0;
  }
</style>
