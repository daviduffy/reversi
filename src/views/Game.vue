<template>
  <div class="game">
    <div><p>{{ currentPlayer }}</p></div>
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
      return this.$store.state.currentPlayer === 1 ? 'black' : 'white';
    },
  },
};
</script>
