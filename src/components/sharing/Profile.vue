<template>
  <div class="profile container">
    <div v-if="profile" class="card">
      <div class="card-content">
        <h4 class="indigo-text center">{{profile.username}}'s smoothies</h4>
        <ul class="collection smoothies" v-if="smoothies">
          <li class="collection-item" v-if="!loading && smoothies.length===0">No Smoothies Yet</li>
          <li class="collection-item" v-if="loading">Loading smoothies...</li>
          <li class="collection-item smoothie-details" v-for="(smoothie, index) in smoothies" :key="smoothie.id">
            <div>
              <span class="title">{{smoothie.title}}</span>
              <p class="grey-text">{{smoothie.ingredients.join(', ')}}
              </p>
            </div>
            <a class="secondary-content pointer-cursor">
              <i class="material-icons" :class="{'indigo-text':smoothie.liked,'grey-text':!smoothie.liked}"
                 @click="likeSmoothie(index)">thumb_up</i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    import db from '../../firebase/database'
    import firebase from 'firebase'

    export default {
        name: 'Profile',
        data() {
            return {
                profile: null,
                smoothies: [],
                loading: true
            }
        },
        methods: {
            likeSmoothie(index) {

                let likes = (this.smoothies[index].likes) ? this.smoothies[index].likes : [];


                if (!this.smoothies[index].liked) {
                    likes.push(firebase.auth().currentUser.uid);
                } else {
                    likes.splice(index, 1);
                }
                this.smoothies[index].liked = !this.smoothies[index].liked;


                db.collection('smoothies').where('user_id', '==', this.profile.id).get()
                    .then((snapshot) => {
                        snapshot.forEach(doc => {
                            db.collection('smoothies').doc(doc.id).update({likes: likes})
                                .catch(() => {
                                    this.smoothies[index].liked = !this.smoothies[index].liked
                                })
                        });

                    });

            }
        },
        created() {
            let ref = db.collection('users');
            this.loading = true;
            ref.doc(this.$route.params.user_id).get()
                .then(user => {
                    this.profile = user.data();
                    this.profile.id = user.id;

                    db.collection('smoothies').where('user_id', '==', this.profile.id).get()
                        .then(snapshot => {
                            this.loading = false;
                            snapshot.forEach(doc => {
                                let smoothie = doc.data();
                                smoothie.id = doc.id;
                                smoothie.liked = smoothie.likes ? smoothie.likes.includes(firebase.auth().currentUser.uid) : false;

                                this.smoothies.push(smoothie);

                            })
                        })
                });

        }
    }
</script>

<style>
  .profile {
    margin-top : 60px;
  }

  .pointer-cursor {
    cursor : pointer;
  }

  .collection.smoothies {
    margin-top : 30px;
  }

  .smoothie-details {
    display         : flex;
    justify-content : space-between;
    align-items     : center;
  }
</style>
