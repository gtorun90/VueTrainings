<template>
  <div class="container">
    <h1>Tebirkler!!!  Yarışmayı {{getPoints.totalPoint}}  puanla tamamladınız!</h1>
    <button @click="newGame">Yeni Oyun</button>
      
    <canvas id="canvas" key="canvas"></canvas> 
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
methods:{
    newGame(){
        this.$router.push('/');
    }
},
computed: mapGetters(['getPoints']),

};
</script>
<style scoped>
.container{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.container h1{
    font-size: 333%;
    color: darkgreen;
    opacity: .5;
}
.container button{
    width: 200px;
    background-color: #fff;
    color: darkred;
    border: 1px solid darkgreen;
    height: 50px;
    font-size:15px ;
    border-radius: 5px;
    outline: none;
}
.container button:hover{
    background-color: darkgreen;
    color: #fff;
    cursor: pointer;
    transition: all .5s;
}
</style>
