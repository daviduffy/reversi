<template>
  <div class="Board">
    <tile-component
      v-for="tile in tiles"
      :key="tile.key"
      v-bind="tile"
    />
  </div>
</template>

<script>
import TileComponent from '@/components/Tile.vue';

export default {
  name: 'Board',
  components: {
    TileComponent,
  },
  computed: {
    tiles() {
      return this.$store.state.tilesProjection;
    },
    currentPlayer() {
      return this.$store.state.currentPlayer;
    },
  },
};
</script>

<style lang="scss">
  .Board {
    display: grid;
    grid-template-rows: repeat(var(--side-length), 60px);
    grid-template-columns: repeat(var(--side-length), 60px);
    justify-content: center;
    margin: 0 auto;
  }
</style>
