<template>
    <div class="container">
        <b-row>
            <b-col>
                <h1>{{room.player1}}</h1>
                <h3>score: {{room.score1}}</h3>
                <a @click="play1"><img width="70%" src="https://cdn0.iconfinder.com/data/icons/summer-2/512/Summer_512px-14.png"/></a>
            </b-col>
            <img src="https://png.pngtree.com/svg/20170314/the_vertical_line_270296.png"/>
            <b-col>
                <h1>{{room.player2}} </h1>
                <h3>score: {{room.score2}}</h3>
                <a @click="play2"><img width="70%" src="https://image.flaticon.com/icons/png/512/194/194630.png"/></a>
            </b-col>
        </b-row>
    </div>
</template>
<script>

export default {
  data () {
    return {
        room: Object,
        score1: 0,
        score2: 0
    }
  },
  methods: {
    play1 () {
        if (localStorage.getItem('name') === this.room.player1) {
            var audio = new Audio("http://s1download-universal-soundbank.com/mp3/sounds/147.mp3");
            audio.play()
            .then((data) => {
                if (this.room.score1 < 20) {
                    if (this.room.score2 === 21) {
                        this.lose()
                    } else {
                        this.score1++
                        this.$store.dispatch('updateScore', { id:this.room.id, score: this.score1, type: 'score1'} )
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
        if (localStorage.getItem('name') === this.room.player2) {
            var audio = new Audio("http://www.orangefreesounds.com/wp-content/uploads/2018/04/Dog-woof-single-sound.mp3?_=1");
            audio.play()
            .then((data) => {
                if (this.room.score2 < 20) {
                    if (this.room.score1 === 21) {
                        this.lose()
                    } else {
                        this.score2++
                        this.$store.dispatch('updateScore', { id: this.room.id, score: this.score2, type: 'score2'} )
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
      })
    //   .then(() => {
    //         router.push('/')
    //   })
    
    this.$store.dispatch('exitMe')
    //   this.lose();
    //   this.$store.dispatch('reset', this.room.id);
    },
    lose () {
      swal ({
        icon:"error",
        text: "BIG LOSER !!!!!"
      })
      this.$store.dispatch('reset', this.room.id);
    }
  },
  mounted() {
    if(!localStorage.getItem("name")) {
      this.$router.push('/')
    } else {
      let id =  this.$route.params.id 
      let myroom = this.$store.state.all_room
    //   myroom.filter((el) => {
    //       if (el.id === id) {
    //           return el
    //       }
    //   }
    let newRoom = myroom.filter(function(e) {
      if (e.id == id) {
          return e
      }
    })
      this.room = newRoom[0]
    }
  },
  watch: {
    score2: function (val) {
        if(!localStorage.getItem("name")) {
           this.$router.push('/')
        } else {
            let id =  this.$route.params.id 
            let myroom = this.$store.state.all_room
            let newRoom = myroom.filter(function(e) {
                if (e.id == id) {
                return e
                }
            })
            this.room = newRoom[0]
        }
    },
    score1: function (val) {
        if(!localStorage.getItem("name")) {
           this.$router.push('/')
        } else {
            let id =  this.$route.params.id 
            let myroom = this.$store.state.all_room
            let newRoom = myroom.filter(function(e) {
                if (e.id == id) {
                return e
                }
            })
            this.room = newRoom[0]
        }
    }
  }
}
</script>
