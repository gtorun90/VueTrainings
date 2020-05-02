<template>
  <div class="kelime">
    <div class="elmas">
      <div class="hexagon harf">
        <transition name="rotate" appear>
          <p v-if="isOpened">{{letter}}</p>
          <span v-else></span>
        </transition>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      //letter:'',
      //isOpened: false
    };
  },
  props: ["letter", "isOpened"]
};
</script>

<style scoped>
.kelime {
  margin: 0 auto;
  text-align: center;
  display: inline-block;
}
.elmas {
  overflow: hidden;
  padding: 0 4px;
  width: 60px;
  height: 60px;
}
.harf {
  font-weight: 700;
  color: #cb484a;
  justify-content: center;
  font-size: 20pt;
}
.hexagon {
  position: relative;
  width: 60px;
  height: 60px;
  line-height: 50px;
  text-align: center;
  display: inline-block;
  padding: 5px 0;
  margin-right: 5px;
}
.hexagon:before {
  content: "";
  position: absolute;
  display: block;
  background: transparent url("../assets/img/hexa.png") no-repeat;
  z-index: 1;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
/* .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8  {
  opacity: 0;
} */
.rotate-enter {
}
.rotate-enter-active {
  animation: rotate ease-out .2s;
}
.rotate-leave {
}
.rotate-leave-active {
}

@keyframes rotate {
  from {
    transform: rotateX(0);
  }
  to {
    transform: rotateX(1080deg);
  }
}
</style>