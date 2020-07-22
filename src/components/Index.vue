<template>
  <div class="index container">

    <div class="card hoverable" v-for="(smoothie, idx) in smoothies" :key="smoothie.id">
      <div class="card-content">
        <span class="card-title indigo-text">{{smoothie.title}}</span>
        <ul class="ingredients">
          <li v-for="(ing, index) in smoothie.ingredients" :key="index"><span class="chip">{{ing}}</span></li>
        </ul>
      </div>
      <div class="card-action">
        <router-link :to="{name:'EditSmoothie',params:{smoothie_slug:smoothie.slug}}" class="pink-text"><i
          class="material-icons">edit</i>Edit
        </router-link>
        <a href="#" class="pink-text" @click="deleteSmoothie(smoothie.id, idx)"><i class="material-icons">delete</i>Delete</a>
      </div>
    </div>
    <!--todo add simple authentication to prevent one user from deleting all entries-->
  </div>
</template>

<script>
    import db from '../firebase/database'

    export default {
        name: 'Index',
        data() {
            return {
                smoothies: []
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

            db.collection('smoothies').get()
                .then(snapshot => {
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
    display               : grid;
    grid-template-columns : 1fr 1fr 1fr;
    grid-gap              : 30px;
    margin-top            : 60px
  }

  @media all  and (max-width: 760px){
    .index {
      grid-template-columns : 1fr;
      grid-gap              : 30px;
      margin-top            : 30px
    }
  }

  .index .ingredients {
    margin-top    : 30px;
    margin-bottom : 0;

  }

  .index .ingredients li {
    display : inline-block;
  }

  .card-action .material-icons {
    vertical-align : bottom;
    padding-right  : 5px;
  }
</style>
