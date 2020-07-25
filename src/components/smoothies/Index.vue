<template>
  <div class="index">

    <div v-if="!loading && smoothies.length===0" class="center-align">Your smoothie list is empty, go ahead and add
      one.
    </div>
    <div v-if="loading" class="center-align">Loading...</div>
    <div class="cards-container">
      <div class="card hoverable" v-for="(smoothie, idx) in smoothies" :key="smoothie.id">
        <div class="card-content">
          <span class="card-title indigo-text">{{smoothie.title}}</span>
          <ul class="ingredients">
            <li v-for="(ing, index) in smoothie.ingredients" :key="index"><span class="chip">{{ing}}</span></li>
          </ul>
        </div>
        <div class="card-action">
          <div>
            <router-link :to="{name:'EditSmoothie',params:{smoothie_slug:smoothie.slug}}" class="pink-text"><i
              class="material-icons">edit</i>Edit
            </router-link>
            <a class="pink-text cursor-pointer" @click="deleteSmoothie(smoothie.id, idx)"><i
              class="material-icons">delete</i>Delete</a>
          </div>
          <span class="grey-text "><i class="material-icons">thumb_up</i>{{smoothie.likes?smoothie.likes.length:0}} likes</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import db from '../../firebase/database'

    export default {
        name: 'Index',
        data() {
            return {
                smoothies: [],
                loading: false
            }
        },
        methods: {
            deleteSmoothie(id, index) {
                db.collection('smoothies').doc(id).delete().then(() => {
                    this.smoothies.splice(index, 1);
                });

            }
        },
        created() {
            this.loading = true;
            db.collection('smoothies').get()
                .then(snapshot => {
                    this.loading = false;
                    snapshot.forEach(doc => {
                        let smoothie = doc.data();
                        smoothie.id = doc.id;
                        this.smoothies.push(smoothie)
                    })
                })
        },

    }
</script>

<style scoped>
  .index {
    width  : 80%;
    margin : 60px auto;
  }

  .index .cards-container {
    display               : grid;
    grid-template-columns : 1fr 1fr 1fr;
    grid-gap              : 30px;
  }

  @media all  and (max-width : 760px) {
    .index .cards-container {
      grid-template-columns : 1fr;
      grid-gap              : 30px;
    }
  }

  .index .ingredients {
    margin-top    : 30px;
    margin-bottom : 0;

  }

  .index .ingredients li {
    display : inline-block;
  }

  .card-action {
    display         : flex;
    justify-content : space-between;
  }

  .card-action .material-icons {
    vertical-align : bottom;
    padding-right  : 5px;
  }

  .cursor-pointer {
    cursor : pointer;
  }
</style>
