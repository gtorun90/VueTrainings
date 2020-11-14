<template>
  <div id="countdown">
    <div
      id="countdown-number"
      class="float-right"
    >{{time}}</div>
    <svg>
      <circle
        :id="idChanged"
        r="18"
        cx="20"
        cy="20"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: ["timeType", "time"],
  data() {
    return {
      id: "single",
    };
  },
  computed: {
    idChanged() {
      return this.timeType == 1 ? "total" : "single";
    },
  },
  watch: {
    timeType(val) {
      if (val === 1) {
        console.log(val + "Burada");
        this.id = "total";
      }
    },
  },
};
</script>

<style scoped>
#countdown {
  position: relative;
  height: 40px;
  width: 40px;
  text-align: center;
}

#countdown-number {
  color: white;
  display: inline-block;
  line-height: 40px;
}

svg {
  position: absolute;
  width: 40px;
  height: 40px;
  transform: rotateY(-180deg) rotateZ(-90deg);
}

svg circle {
  stroke-dasharray: 113px;
  stroke-dashoffset: 0px;
  stroke-linecap: round;
  stroke-width: 2px;
  stroke: #fa1570;
  fill: none;
  animation: countdown 30s linear infinite forwards;
}

#total {
  animation: countdown 300s linear infinite forwards !important;
}
@keyframes countdown {
  from {
    stroke-dashoffset: 0px;
  }
  to {
    stroke-dashoffset: 113px;
  }
}
</style>