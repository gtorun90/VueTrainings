<template>
  <div class="word">
    <div class="diamond">
      <div class="hexagon letter">
        <transition name="rotate" appear>
          <p class="d-inline-block" v-if="isOpened">{{letter | upper }}</p>
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
  props: ["letter", "isOpened"],
};
</script>

<style scoped>
.word {
  margin: 0 auto;
  text-align: center;
  display: inline-block;
}
.diamond {
  overflow: hidden;
  padding: 0 4px;
  width: 60px;
  height: 60px;
}
.letter {
  font-weight: 700;
  color: #fa1570;
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
  display: inline-block;
  background: transparent url("../assets/img/hexa.png") no-repeat;
  z-index: 1;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}

.rotate-enter-active {
  animation: rotate ease-out 0.2s;
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