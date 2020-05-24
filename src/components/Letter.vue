<template>
  <div class="kelime">
      <div class="hexagon harf">
        <transition name="rotate" appear>
          <p v-if="isOpened">{{letter | upper }}</p>
          <span v-else></span>
        </transition>
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
  overflow: hidden;
  padding: 0 4px;
  width: 60px;
  height: 60px;
}
/* .elmas {
  overflow: hidden;
  padding: 0 4px;
  width: 60px;
  height: 60px;
} */
.harf {
  font-weight: 700;
  color: #FA1570;
  justify-content: center;
  font-size: 20pt;
}
.hexagon {
  position: relative;
  width: 60px;
  height: 60px;
  line-height: 50px;
  text-align: center;
  display: flex;
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
  animation: rotate ease-out .2s;
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