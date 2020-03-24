<template>
  <div class="Tile">
    <button
      :class="classes"
      @click="handleClick"
    />
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
    classes() {
      const { owner } = this;
      return {
        Tile__button: true,
        [`Tile__button--${owner}`]: owner,
      };
    },
  },
  methods: {
    handleClick() {
      const payload = { type: 'CLICK_TILE', index: this.index };
      this.$store.dispatch(payload);
    },
  },
};
</script>

<style scoped lang="scss">
.Tile {
  height: 60px;
  width: 60px;
  position: relative;
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
}

.Tile__button--1 {
  background-color: black;
}

.Tile__button--2 {
  background-color: white;
}
</style>
