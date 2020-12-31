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

<style scoped lang="scss">
  .Board {
    display: grid;
    grid-template-rows: repeat(10, 1fr);
    grid-template-columns: repeat(10, 1fr);
    max-width: 600px;
    margin: 0 auto;
  }
</style>
