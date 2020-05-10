<template>
<div>
  <div class="alert alert-success mt-2 text-white" role="alert" v-if="messageType == 'success'">
     <span>{{message}}</span>
  </div>
  <div class="alert alert-danger mt-2 text-white" role="alert" v-if="messageType == 'danger'">
      <span>{{message}}</span>
  </div>
  <div class="alert alert-info mt-2 text-white" role="alert" v-if="messageType == 'info'">
      <span>{{message}}</span>
  </div>
</div>
</template>

<script>
export default {
    props:['messageType','message']

}
</script>

<style>

</style>