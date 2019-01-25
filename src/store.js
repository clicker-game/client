import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import config from '@/assets/config.js';
const firebase = require('firebase');
firebase.initializeApp(config);
const firestore = firebase.firestore();
import router from './router';

export default new Vuex.Store({
  state: {
    all_room: [],
    exit: '',
  },
  mutations: {
    showAllRoomMutator(state, rooms) {
      state.all_room = rooms;
    },
    resetMutator(state, room_id) {
      state.exit='exit bosqu'
    }
  },
  actions: {
    showAllRoom({ commit }) {
      firestore.collection('room').onSnapshot((singleRoom) => {
        let room_collections = singleRoom.docs.map((e) => {
          return {
            ...e.data(),
            id:e.id
          }
        })
        commit('showAllRoomMutator', room_collections);
      }, (err) => {
        console.log(err, 'ini err dari show allroom')
      })
    },
    createRoom({ commit }, room_name) {
      firestore.collection('room').add({
        name: room_name,
        player1: localStorage.getItem('name'),
        player2: null,
        score1: 0,
        score2: 0,
        winner: false
      })
      .then((ref) => {
        router.push(`/game/${ref.id}`);
        this.room_name = '';
      })
    },
    joinRoom({ commit }, room_id) {
      firestore.collection('room').doc(room_id).get()
        .then((one_room) => {
          if (one_room.data().player1 != null && one_room.data().player2 != null) {
            swal('Oops', 'Room Already Full', 'error')
          } 
          else if (one_room.data().player1 == localStorage.getItem('name') || one_room.data().player2 == localStorage.getItem('name')){
            swal('OMG!', 'Already Joined This Room', 'success')
          }
          else {
            if (one_room.data().player1 == null) {
              firestore.collection('room').doc(room_id).update({player1: localStorage.getItem('name')})
              .then(() => {
                firestore.collection('room').doc(room_id).get()
                .then((one_room) => {
                  if (one_room.data().player1 != null && one_room.data().player2 != null) {
                    router.push(`/game/${room_id}`)
                  }
                })
                .catch((err) => {
                  console.log(err, 'ini err dari two player start')
                })
              })
              .catch((err) => {
                console.log(err, 'ini err dari join room')
              })
            } else {
              firestore.collection('room').doc(room_id).update({player2: localStorage.getItem('name')})
              .then(() => {
                firestore.collection('room').doc(room_id).get()
                .then((one_room) => {
                  if (one_room.data().player1 != null && one_room.data().player2 != null) {
                    router.push(`/game/${room_id}`)
                  }
                })
                .catch((err) => {
                  console.log(err, 'ini err dari two player start')
                })

              })
              .catch((err) => {
                console.log(err);
              })
            }
          } 
        })
        .catch((err) => {
          console.log(err, 'ini err dari join room')
        })
    },
    exitRoom({ commit },  room_id) {
      firestore.collection('room').doc(room_id).get()
      .then((one_room) => {
        if (one_room.data().player1 == localStorage.getItem('name')) {
          firestore.collection('room').doc(room_id).update({player1: null});
          firestore.collection('room').doc(room_id).get()
          .then((one_room) => {
            if (one_room.data().player1 == null && one_room.data().player2 == null) {
              firestore.collection('room').doc(room_id).delete();
              swal('Horray', 'Bye Room', 'success');
            }
          })
          .catch((err) => {
            console.log(err, 'ini err dari auto delete')
          })
        } else if (one_room.data().player2 == localStorage.getItem('name')) {
          firestore.collection('room').doc(room_id).update({player2: null});
          firestore.collection('room').doc(room_id).get()
          .then((one_room) => {
            if (one_room.data().player1 == null && one_room.data().player2 == null) {
              firestore.collection('room').doc(room_id).delete();
              swal('Horray', 'Bye Room', 'success');
            }
          })
          .catch((err) => {
            console.log(err, 'ini err dari auto delete')
          })
        }
      })
      .catch((err) => {
        console.log(err, 'ini err dari exit room')
      })
    },
    reset({commit}, room_id) {
      firestore.collection('room').doc(room_id).delete();
      router.push(`/`);
      commit('resetMutator', room_id);
    },
    autoDelete({ dispatch, commit }, room_id) {
      firestore.collection('room').doc(room_id).get()
      .then((one_room) => {
        if (one_room.data().player1 == null && one_room.data().player2 == null) {
          firestore.collection('room').doc(room_id).delete();
          swal('Horray', 'Bye Room', 'success');
        }
      })
      .catch((err) => {
        console.log(err, 'ini err dari auto delete')
      })
    },
    updateScore({commit}, room_score) {      
      if (room_score.type == 'score1') {
        firestore.collection('room').doc(room_score.id).update({score1: room_score.score +1})
      } else {
        firestore.collection('room').doc(room_score.id).update({score2: room_score.score +1})
      }
    },
    exitMe({commit}) {
      router.push(`/`);
    }
  }
})
