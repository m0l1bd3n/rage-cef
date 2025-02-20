<script>
export default {
  name: 'App',
};
</script>

<template>
  <router-view />
</template>

<style>
@import url("/src/assets/fonts/stylesheet.css");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Gilroy", sans-serif;
}

html, body {
  height: 100%;
  font-family: Gilroy, sans-serif;
  background-color: rgba(16, 16, 16, 0.90);
  color: #FFF;
}
</style>