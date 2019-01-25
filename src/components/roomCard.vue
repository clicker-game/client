<template>
  <div>
    <b-container v-for="(room, index) in all_room" :key="`room-${index}`" class="mt-5 mr-5">
      <b-card title="Room:"
              img-src="https://picsum.photos/600/300/?image=25"
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 20rem;"
              class="mb-2">
        <p class="card-text">
          {{ room.name }}
        </p>
        <p>Player1: {{ room.player1 }} </p>
        <p>Player2: {{ room.player2 }} </p>
        <b-button @click="exitRoom(room.id)" class="mr-5" variant="danger">Exit</b-button>
        <b-button @click="joinRoom(room.id)" variant="primary">Join</b-button>
      </b-card>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rooms: [],
    }
  },
  methods: {
    joinRoom(room_id) {
      this.$store.dispatch('joinRoom', room_id)
    },
    exitRoom(room_id) {  
      this.$store.dispatch('exitRoom', room_id)
    }
  },
  computed: {
    all_room() {
      return this.$store.state.all_room;
    }
  },
}
</script>

<style>

</style>
