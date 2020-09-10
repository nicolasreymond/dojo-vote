<template>
  <div id="simple">
    <p>All of your components html goes inside these template tags</p>
    <h1>{{ counter }}</h1>
    <button v-on:click="counter += 1">Add 1</button>
  </div>
</template>

<script>
export default {
  name: "simple-component",

  data() {
    return {
      counter: 1
    };
  },
  methods: {
    increment() {
      this.counter += 1;
    }
  }
};
</script>

<style scoped>
p {
  background-color: blue;
}
</style>