<template>
  <div :class="containerClasses">
    <button
      :class="buttonClasses"
      @click="handleClick"
    >
  </button>
  </div>
</template>

<script>
export default {
  name: 'TileComponent',
  props: {
    index: {
      type: Number,
      required: true,
    },
    owner: {
      type: [Boolean, Number],
      required: true,
    },
  },
  computed: {
    buttonClasses() {
      const { owner } = this;
      return {
        Tile__button: true,
        [`Tile__button--${owner || 'vacant'}`]: true,
      };
    },
    containerClasses() {
      const { owner } = this;
      return {
        Tile: true,
        Tile__owned: owner,
      };
    },
  },
  methods: {
    handleClick() {
      if (this.owner === false) {
        const payload = { index: this.index };
        this.$store.dispatch('startClickTile', payload);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.Tile {
  height: 60px;
  width: 60px;
  position: relative;
  border-top: 1px solid #0e0e0e;
  border-left: 1px solid #0e0e0e;
}

.Tile:nth-child(8n) {
  border-right: 1px solid #0e0e0e;
}

.Tile:nth-child(n + 57) {
  border-bottom: 1px solid #0e0e0e;
}

.Tile__button {
  all: unset;
  height: 48px;
  width: 48px;
  background-color: lightgray;
  margin: 6px;
  border-radius: 50%;
  display: block;
  box-shadow: 0 2px 4px rgba(0,0,0,.5);
  cursor: pointer;
}

.Tile__button--vacant {
  background: none;
  box-shadow: initial;
}

.Tile__button--1 {
  background-color: black;
}

.Tile__button--2 {
  background-color: white;
}
</style>
