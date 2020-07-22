<template>
  <div class="new-message">
    <form @submit.prevent="sendMessage" autocomplete="off">
      <div class="row">
        <div class="input-field">
          <input id="new-message" name="new-message" v-model="newMessage" type="text" class="validate">
          <label for="new-message" type="text">New message (press enter to send)</label>
          <p v-if="feedback" class="red-text">{{feedback}}</p>
        </div>
      </div>
    </form>
  </div>

</template>

<script>
    import db from '../firebase/database'

    export default {
        name: 'NewMessage',
        props: ['name'],
        data() {
            return {
                newMessage: null,
                feedback: null
            }
        },
        methods: {
            sendMessage() {
                this.feedback = null;
                if (this.newMessage) {
                    db.collection('messages').add({
                        content: this.newMessage,
                        name: this.name,
                        timestamp: Date.now()
                    }).then(() => {
                        this.newMessage = null
                    }).catch(() => {
                        this.feedback = "Couldn't send message";
                    })

                }
            }
        }
    }
</script>
