<template>
  <div class="home">
    <nameForm v-if="!name"></nameForm>
    <addRoom v-if="name"></addRoom>
    <roomCard></roomCard>
  </div>
</template>

<script>

import addRoom from '@/components/addRoom.vue'
import roomCard from '@/components/roomCard.vue'
import nameForm from '@/components/nameForm.vue'

export default {
  name: 'home',
  data () {
    return {
      name: localStorage.getItem('name'),
    }
  },
  components: {
    addRoom,
    roomCard,
    nameForm
  },
}
</script>
