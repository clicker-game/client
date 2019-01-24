<template>
  <div class="row mb-5" style="margin-top: 3%;">
    <div class="col-md-4"></div>
    <div class="col-md-4">
      <form action="submit" @submit.prevent="writeRoomData">
        <label><h3>Room name:</h3></label>
        <input  class="form-control" type="text" name="roomName" v-model="roomName"><br>
        <button class="btn btn-lg btn-danger" type="submit" @submit.prevent="writeRoomData">CREATE ROOM</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      roomName: ''
    }
  },
  methods: {
    writeRoomData () {
    }
  }
}
</script>

<style>

</style>
