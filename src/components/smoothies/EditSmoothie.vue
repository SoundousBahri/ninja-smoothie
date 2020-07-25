<template>
  <div v-if="smoothie" class="edit-smoothie container">
    <h4 class="center-align indigo-text">Edit {{smoothie.title}}</h4>
    <form class="col s12" @submit.prevent="editSmoothie">
      <div class="row">
        <div class="input-field field col s12">
          <input id="title" name="title" v-model="smoothie.title" type="text" class="validate">
          <label for="title" class="active">Smoothie Title</label>
        </div>
      </div>
      <div class="row" v-for="(ingredient, index)  in smoothie.ingredients" :key="index">
        <div class="input-field field col s12">
          <input :id="'ingredient-'+index" type="text" class="validate" v-model="smoothie.ingredients[index]">
          <i class="material-icons delete-icon" @click="deleteIngredient(index)">delete</i>
          <label :for="'ingredient-'+index" class="active"></label>
        </div>

      </div>
      <div class="row">
        <div class="input-field field col s12">
          <input id="add-ingredient" name="add-ingredient" type="text"
                 v-model="typedIngredient" class="validate" ref="add-ingredient-input">
          <label for="add-ingredient">Add an ingredient</label>
        </div>
      </div>

      <div class="row" v-if="typedIngredient">
        <div class="input-field field col s12">
          <input id="add-another-ingredient" type="text" @focus="addIngredient" class="validate">
          <label for="add-another-ingredient">Add another ingredient</label>
        </div>
      </div>

      <div class="row">
        <div class="col s12 field center-align">
          <p v-if="feedback" class="red-text">{{feedback}}</p>
          <button class="btn waves-effect waves-light" type="submit" name="action">Save
            <i class="material-icons right">save</i>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
    import db from '../../firebase/database'
    import slugify from 'slugify'

    export default {
        name: 'EditSmoothie',
        data() {
            return {
                smoothie: null,
                typedIngredient: null,
                feedback: null

            }
        },
        created() {
            let ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug);
            ref.get().then((snapshot) => {
                snapshot.forEach((doc) => {
                    this.smoothie = doc.data();
                    this.smoothie.id = doc.id;
                });

            })

        },
        methods: {
            editSmoothie() {

                this.addIngredient();
                if (this.smoothie.title) {
                    this.feedback = null;

                    //create a slug

                    this.smoothie.slug = slugify(this.smoothie.title,
                        {
                            replacement: '-',
                            remove: /[$*_+~.()'"!\-:@]/g,
                            lower: true
                        });

                    db.collection('smoothies').doc(this.smoothie.id).update({
                        title: this.smoothie.title,
                        ingredients: this.smoothie.ingredients,
                        slug: this.smoothie.slug
                    }).then(() => {
                        this.$router.push({name: 'Index'})
                    })
                } else {
                    this.feedback = 'You must enter a smoothie title'
                }

            },
            addIngredient() {
                this.$refs['add-ingredient-input'].focus();
                if (this.typedIngredient) {
                    this.smoothie.ingredients.push(this.typedIngredient);
                    this.feedback = null;
                    this.typedIngredient = null;
                } else {
                    this.feedback = "You must enter a value to add an ingredient"
                }

            },
            deleteIngredient(index) {
                this.smoothie.ingredients.splice(index, 1);
                this.$refs['add-ingredient-input'].focus();
            }
        }
    }
</script>

<style>

  .edit-smoothie {
    margin-top    : 60px;
    padding-right : 20px;
    max-width     : 500px;
  }

  .edit-smoothie .field {
    margin   : 0 auto;
    position : relative;
  }

  .edit-smoothie .delete-icon {
    position  : absolute;
    right     : 15px;
    bottom    : 16px;
    color     : #AAAAAA;
    font-size : 1.4em;
    cursor    : pointer;

  }
</style>
