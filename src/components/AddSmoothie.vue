<template>
  <div class="add-smoothie container">
    <h4 class="center-align indigo-text">Add New Smoothie Recipe</h4>
    <form class="col s12" @submit.prevent="addSmoothie">
      <div class="row">
        <div class="input-field field col s12">
          <input id="title" name="title" v-model="title" type="text" class="validate">
          <label for="title">Smoothie Title</label>
        </div>
      </div>
      <div class="row" v-for="(ingredient, index)  in ingredients" :key="index">
        <div class="input-field field col s12">
          <input :id="'ingredient-'+index" type="text" class="validate" v-model="ingredients[index]">
          <i class="material-icons delete-icon" @click="deleteIngredient(index)">delete</i>
          <label :for="'ingredient-'+index"></label>
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
          <button class="btn waves-effect waves-light" type="submit" name="action">Add Smoothie
            <i class="material-icons right">check</i>
          </button>
        </div>
      </div>
    </form>
  </div>

</template>

<script>
    import db from '../firebase/database'
    import slugify from 'slugify'

    export default {
        name: 'AddSmoothie',
        data() {
            return {
                title: null,
                typedIngredient: null,
                ingredients: [],
                feedback: null

            }
        },
        methods: {
            addSmoothie() {

                this.addIngredient();
                if (this.title) {
                    this.feedback = null;

                    //create a slug

                    let slug = slugify(this.title,
                        {
                            replacement: '-',
                            remove: /[$*_+~.()'"!\-:@]/g,
                            lower: true
                        });

                    db.collection('smoothies').add({
                        title: this.title,
                        ingredients: this.ingredients,
                        slug: slug
                    }).then(() => {
                        this.$router.push({name: 'Index'})
                    })
                } else {
                    this.feedback = 'You must enter a smoothie title'
                }

            },
            addIngredient() {
                this.$refs['add-ingredient-input'].focus();
                console.log("addIngredient");
                if (this.typedIngredient) {
                    this.ingredients.push(this.typedIngredient);
                    this.feedback = null;
                    this.typedIngredient = null;
                } else {
                    this.feedback = "You must enter a value to add an ingredient"
                }

            },
            deleteIngredient(index) {
                this.ingredients.splice(index, 1);
                this.$refs['add-ingredient-input'].focus();
            }
        }
    }
</script>

<style>

  .add-smoothie {
    margin-top    : 60px;
    padding-right : 20px;
    max-width     : 500px;
  }

  .add-smoothie .field {
    margin   : 0px auto;
    position : relative;
  }

  .add-smoothie .delete-icon {
    position  : absolute;
    right     : 15px;
    bottom    : 16px;
    color     : #AAAAAA;
    font-size : 1.4em;
    cursor    : pointer;

  }
</style>
