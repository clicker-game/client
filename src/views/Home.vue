<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <nameForm v-if="!name"></nameForm>
    <addRoom v-if="name"></addRoom>
    <roomCard v-if="name"></roomCard>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import addRoom from '@/components/addRoom.vue'
import roomCard from '@/components/roomCard.vue'
import nameForm from '@/components/nameForm.vue'

export default {
  name: 'home',
  data () {
    return {
      name: localStorage.getItem('myname')
    }
  },
  components: {
    // HelloWorld,
    addRoom,
    roomCard,
    nameForm
  }
}
</script>
