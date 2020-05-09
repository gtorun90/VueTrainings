<template>
  <nav class="navbar fixed-bottom navbar-light" style="background-color: #4ecdc4;">
    <span class="navbar-text navbar-nav my-2 my-lg-0 mr-3">
      <strong>Toplam Puan :</strong>
      <span class="badge badge-info">{{getPoints.totalPoint}}</span>
    </span>
    <span class="navbar-text navbar-nav my-2 my-lg-0 mr-3">
      <strong>Soru Puanı :</strong>
      <span class="badge badge-info">{{getPoints.currentQuestionPoint}}</span>
    </span>
  </nav>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
  computed: mapGetters(['getPoints'])
} 
</script>