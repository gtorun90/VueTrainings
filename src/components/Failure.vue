<template>
  <div class="container">
    <h1>Süre Doldu! Yarışmayı <strong>{{getPoints.totalPoint}}</strong>  puanla tamamladınız!</h1>
    <button class="m-5" @click="newGame">Yeni Oyun</button>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
  methods: {
    newGame() {
      
        this.$router.push('/');
    }
  },
  computed:mapGetters(['getPoints']),
};
</script>
<style scoped>
.container {
  margin-top:50px;
  align-items: center;
  justify-content: center;
}
.container h1 {
  /* font-size: 333%; */
  color: white;
}
.container button {
  width: 200px;
  background-color: #fff;
  color: #fa1570;
  border: 1px solid #fa1570;
  margin-left: 50px;
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
</style>
