<template>
  <div class="game">
    <div><p>{{ currentPlayer }}</p></div>
    <div><button @click="reset">reset</button></div>
    <Board />
  </div>
</template>

<script>
// @ is an alias to /src
import Board from '@/components/Board.vue';

export default {
  name: 'Home',
  components: {
    Board,
  },
  computed: {
    currentPlayer() {
      console.log(JSON.parse(JSON.stringify(this.$store.state)));
      return this.$store.state.currentPlayer === 1 ? 'black' : 'white';
    },
  },
  methods: {
    reset() {
      this.$store.dispatch('startResetGame');
    },
  },
};
</script>
