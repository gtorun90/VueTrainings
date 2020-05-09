<template>
<div>
  <div class="alert alert-success mt-2" role="alert" v-if="messageType == 'success'">
      Tebrikler Doğru Bildiniz!
  </div>
  <div class="alert alert-danger mt-2" role="alert" v-if="messageType == 'danger'">
      Hatalı Cevap!
  </div>
  <div class="alert alert-info mt-2" role="alert" v-if="messageType == 'info'">
      Harf sayıları tutmuyor!
  </div>
</div>
</template>

<script>
export default {
    props:['messageType']

}
</script>

<style>

</style>