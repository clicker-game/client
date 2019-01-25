<template>
  <div class="row mb-5" style="margin-top: 3%;">
    <div class="col-md-4"></div>
    <div class="col-md-4">
      <form action="submit" @submit.prevent="userLogin">
        <label><h3>Your name:</h3></label>
        <input  class="form-control" type="text" name="name" v-model="name"><br>
        <button class="btn btn-lg btn-danger" type="submit">LET'S JOIN</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: ''
    }
  },
  methods: {
    userLogin () {
      localStorage.setItem('name', this.name)
      this.name = ''
      window.location.reload()
    }
  }
}
</script>

<style>

</style>
