<template>
  <div class="chat container">
    <h4 class="indigo-text center-align">Live Chat</h4>
    <ul class="collection messages" v-chat-scroll v-if="messages">
      <li class="collection-item" v-if="messages.length===0">Loading messages ...</li>
      <li class="collection-item avatar" v-else v-for="message in messages" :key="message.id">
        <i class="material-icons circle green">person</i>
        <span class="title">{{message.name}}</span>
        <p>{{message.content}}</p>
        <p class="grey-text time">{{message.timestamp}}</p>
      </li>
    </ul>
    <div class="card-action">
      <NewMessage :name="name"/>
    </div>
  </div>


</template>

<script>
    import NewMessage from "./NewMessage";
    import db from '../firebase/database';
    import moment from 'moment';

    export default {
        name: 'Chat',
        props: ['name'],
        data() {
            return {
                messages: []
            }
        },
        created() {
            let ref = db.collection('messages').orderBy('timestamp').limit(50);
            ref.onSnapshot((snapshot) => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        let doc = change.doc;
                        this.messages.push({
                            id: doc.id,
                            name: doc.data().name,
                            content: doc.data().content,
                            timestamp: moment(doc.data().timestamp).format('lll')
                        })

                    }
                })
            });
        },
        components: {
            NewMessage
        }
    }

</script>

<style>

  .chat {
    padding-top : 21px;
  }

  .chat h4 {
    padding-bottom : 30px;
  }

  .chat .time {
    font-size : 0.8em;
  }

  .messages {
    max-height : 75vh;
    overflow-y : scroll;
  }

  .messages::-webkit-scrollbar {
    width : 3px;
  }

  .messages::-webkit-scrollbar-track {
    background : #DDDDDD;

  }

  .messages::-webkit-scrollbar-thumb {
    background : #AAAAAA;
  }
</style>
