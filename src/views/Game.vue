<template>
  <div class="game">
    <div><p>{{ currentPlayer }}</p></div>
    <div>
      <button @click="reset">reset</button>
      <button @click="undo">undo</button>
    </div>
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
  methods: {
    reset() {
      this.$store.dispatch('startResetGame');
    },
    undo() {
      this.$store.dispatch('startUndo');
    },
  },
};
</script>
