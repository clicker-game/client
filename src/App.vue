<template>
  <div id="app">
<<<<<<< HEAD
    <div id="nav" style="background:black">
      <router-link to="/" style="font-size:40px; color:white;" class="mr-5">Home</router-link> <img alt="Vue logo" class="mr-5" src="./assets/logo-game.png" style="height:100px;"> <button class="btn btn-lg btn-danger" type="submit" @click.prevent="logout" v-if="name">LOGOUT</button>
      <!-- <router-link to="/about">About</router-link> -->
=======
    <div>
      <h1>HALO INI APP</h1>
      <h5>Create Room</h5>
      <input v-model="room_name" type="text" placeholder="create room">
      <button @click="createRoom">Create Room</button>
      <!-- looping document id -->
      <ul v-for="(room, index) in all_room" :key="`room-${index}`">
        <li>{{ room.name }}</li>
        <li @click="joinRoom(room.id)">Join This Room</li>
        <li @click="exitRoom(room.id)">exit this room</li>
      </ul>

    </div>

    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
>>>>>>> checkpoint
    </div>
    <router-view/> -->
  </div>
</template>
<script>
import config from '@/assets/config.js';
const firebase = require('firebase');
firebase.initializeApp(config);
const firestore = firebase.firestore();

export default {
  name: 'Appo',
  data() {
    return {
      test: '',
      room_name: '',
      all_room: [],
    }
  },
  methods: {
    createRoom() {
      firestore.collection('room').add({
        name: this.room_name,
        player1: localStorage.getItem('myname'),
        player2: null,
        score1: 0,
        score2: 0,
        winner: false
      })
      .then((ref) => {
        console.log('Added document with ID: ', ref.id);
        this.room_name = '';
      })
    },
    joinRoom(room_id) {
      firestore.collection('room').doc(room_id).get()
        .then((one_room) => {
          if (one_room.data().player1 != null && one_room.data().player2 != null) {
            alert('Room Full Please Join Another Room!')
          } 
          else {
            if (one_room.data().player1 == null) {
              firestore.collection('room').doc(room_id).update({player1: localStorage.getItem('myname')});
              alert('suskes join room ini sebagai player 1');
              // ngarahin ke game page view
            } 
            else {
              firestore.collection('room').doc(room_id).update({player2: localStorage.getItem('myname')});
              alert('sukses join room ini sebgai player 2');
              // ngarahin ke game page view
            }
          } 
        })
        .catch((err) => {
          console.log(err, 'ini err dari join room')
        })
    },
    exitRoom(room_id) {
      console.log('masuk exit room')
      firestore.collection('room').doc(room_id).get()
      .then((one_room) => {
        if (one_room.data().player1 == localStorage.getItem('myname')) {
          firestore.collection('room').doc(room_id).update({player1: null});
          alert('oke player 1 telah exit');
          this.autoDelete(room_id);
        } else if (one_room.data().player2 == localStorage.getItem('myname')) {
          firestore.collection('room').doc(room_id).update({player2: null});
          alert('oke player 2 telah exit');
          this.autoDelete(room_id);
        }
      })
      .catch((err) => {
        console.log(err, 'ini err dari exit room')
      })
    },
    showAllRoom() {
      firestore.collection('room').onSnapshot((singleRoom) => {
        let room_collections = singleRoom.docs.map((e) => {
          return {
            ...e.data(),
            id:e.id
          }
        })
        this.all_room = room_collections;
        console.log(this.all_room, 'ini all room dari show all room')
      }, (err) => {
        console.log(err, 'ini err dari show allroom')
      })
    },
    autoDelete(room_id) {
      console.log('masuk auto delete', room_id)
      firestore.collection('room').doc(room_id).get()
      .then((one_room) => {
        if (one_room.data().player1 == null && one_room.data().player2 == null) {
          firestore.collection('room').doc(room_id).delete();
          alert('sukses delete room')
        }
      })
      .catch((err) => {
        console.log(err, 'ini err dari auto delete')
      })
    },
    twoPlayerStart(room_id) {
      firestore.collection('room').doc(room_id).get()
      .then((one_room) => {
        if (one_room.data().player1 != null && one_room.data().player2 != null) {
          // ready to start game
          // push to another view
        }
      })
      .catch((err) => {
        console.log(err, 'ini err dari two player start')
      })
    },
    
    // checkWinner() {
      
    // },
    // roomToGame() {
      
    // }

  },
  mounted() {
    this.showAllRoom();
    localStorage.setItem('myname', 'jerry')
  }
}
</script>

<script>
export default {
  name: 'home',
  data () {
    return {
      name: localStorage.getItem('myname')
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      window.location.reload()
    }
  },
  mounted() {
    if(!this.name) {
      this.$router.push('/')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
