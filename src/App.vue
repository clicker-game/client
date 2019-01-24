<template>
  <div id="app">
    <div id="nav" style="background:black">
      <router-link to="/" style="font-size:40px; color:white;" class="mr-5">Home</router-link> <img alt="Vue logo" class="mr-5" src="./assets/logo-game.png" style="height:100px;"> <button class="btn btn-lg btn-danger" type="submit" @click.prevent="logout" v-if="name">LOGOUT</button>
      <!-- <router-link to="/about">About</router-link> -->
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      name: localStorage.getItem('name')
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      window.location.reload()
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
