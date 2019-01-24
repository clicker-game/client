<template>
    <div class="container">
        <b-row>
            <b-col>
                <h1>Player1</h1>
                <h3>score: {{room.player1score}}</h3>
                <a @click="play1"><img width="70%" src="https://cdn0.iconfinder.com/data/icons/summer-2/512/Summer_512px-14.png"/></a>
            </b-col>
            <img src="https://png.pngtree.com/svg/20170314/the_vertical_line_270296.png"/>
            <b-col>
                <h1>Player2 </h1>
                <h3>score: {{room.player2score}}</h3>
                <a @click="play2"><img width="70%" src="https://image.flaticon.com/icons/png/512/194/194630.png"/></a>
            </b-col>
        </b-row>
    </div>
</template>
<script>
export default {
  data () {
    return {
        room: Object
    }
  },
  methods: {
    play1 () {
        if (localStorage.getItem('name') === this.room.player1) {
            var audio = new Audio("http://s1download-universal-soundbank.com/mp3/sounds/147.mp3");
            audio.play()
            .then((data) => {
                console.log(this.player1score)
                if (this.room.score1 < 20) {
                    if (this.room.score2 === 20) {
                        this.lose()
                    } else {
                        this.$store.dispatch('updateScore', { id:this.$store.params.id, key: "score1"} )
                    }
                }else {
                   this.win()
                }
            })
            .catch((err) => {
                console.log(err.message)
            })
        } else {
            return false
        }
    },
    play2 () {
        if (localStorage.getItem('myname') === this.room.player2) {
            var audio = new Audio("http://www.orangefreesounds.com/wp-content/uploads/2018/04/Dog-woof-single-sound.mp3?_=1");
            audio.play()
            .then((data) => {
                if (this.room.score2 < 20) {
                    if (this.room.score2 === 20) {
                        this.lose()
                    } else {
                        this.$store.dispatch('updateScore', { id:this.$store.params.id, name: "player2"} )
                    }
                } else {
                    this.win()
                }
            })
            .catch((err) => {
                console.log(err.message)
            }) 
        } else {
            return false
        }
    },
    win () {
      swal({
        icon: "success",
        text: "YOU WIN !!!!"
      });
    },
    lose () {
      swal ({
        icon:"error",
        text: "BIG LOSER !!!!!"
      })
    }
  },
  mounted() {
    if(!localStorage.getItem("myname")) {
      this.$router.push('/')
    } else {
      let id = this.$store.params.id
      let myroom = this.$store.state.all_room
      myroom.filter((r) => {
          return r.id === id
      })
      this.room = myroom
    }
  }
}
</script>
