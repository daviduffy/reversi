<template>
  <div class="game">
    <div><p>Current player: {{ currentPlayer }}</p></div>
    <div class="controls">
      <button class="button" @click="reset">reset</button>
      <button class="button" @click="undo">undo</button>
    </div>
    <Board />
    <div>
      <p v-if="gameOver">Game Over</p>
      <p></p>
      <p>Moves: {{ moves }}</p>
    </div>
    <component :is="'style'" type="text/css">
      :root { --side-length: {{ sideLength }} }
    </component>
  </div>
</template>

<script>
import Board from '@/components/Board.vue';

export default {
  name: 'Home',
  components: {
    Board,
  },
  computed: {
    sideLength() {
      return this.$store.state.sideLength;
    },
    currentPlayer() {
      return this.$store.state.currentPlayer === 1 ? 'black' : 'white';
    },
    gameOver() {
      const { gameOver } = this.$store.state.aggregateAnalytics;
      return gameOver;
    },
    histogram() {
      const { histogram } = this.$store.state.aggregateAnalytics;
      return histogram;
    },
    moves() {
      const { moves } = this.$store.state.aggregateAnalytics;
      return moves;
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

<style lang="scss">
.controls {
  margin-bottom: 1rem;
}
.button {
  cursor: pointer;
  border: 0;
  border-radius: 0;
  font-size: 1rem;
  color: #444;
  background-color: #e2e2e2;
  padding: 0.675rem 0.875rem;
}
.button ~ .button {
  margin-left: 0.875rem;
}
</style>
