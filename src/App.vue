<template>
  <div id="app">
    <game />
  </div>
</template>

<script>
import Game from './views/Game.vue';

export default {
  name: 'App',
  components: { Game },
  // eslint-disable-next-line
  beforeMount: function() {
    this.$store.dispatch('startAppSetup')
      .then(() => this.$store.dispatch('startReconstituteGame'));
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
html {
  background-color: #009688;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
