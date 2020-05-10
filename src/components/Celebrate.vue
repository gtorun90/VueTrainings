<template>
  <div class="container">
      <h1  class="h1-centered">Tebrikler!!! Yarışmayı {{getPoints.totalPoint}} puanla tamamladınız!</h1>
      <button class="btn-centered" @click="newGame">Yeni Oyun</button>
      <canvas id="canvas" key="canvas"></canvas>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    newGame() {
      this.$router.push("/");
    }
  },
  computed: mapGetters(["getPoints"])
};
</script>
<style scoped>
.container h1 {
  /* font-size: 333%; */
  color: white;
}
.container button {
  width: 200px;
  background-color: #fff;
  color: #fa1570;
  border: 1px solid #fa1570;
  height: 50px;
  font-size: 15px;
  border-radius: 5px;
  outline: none;
}
.container button:hover {
  background-color: lightgreen;
  color: #fff;
  cursor: pointer;
  transition: all 0.5s;
}
.btn-centered {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.h1-centered {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
