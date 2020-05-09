<template>
  <nav class="navbar navbar-expand-lg" style="background-color: #0b132b">
    <!-- <a class="navbar-brand" href="#"></a> -->
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="container collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav d-flex justify-content-between">
        <router-link to="/" tag="li" class="navbar-brand" active-class="active">
          <a class="nav-link"><strong>Oyun Sayfası</strong></a>
        </router-link>
      </ul>
      <ul class="navbar-nav flex-row ml-md-auto d-none d-md-flex">
        <router-link to="/new-question" tag="li" class="navbar-brand" active-class="active">
          <a class="nav-link"><strong>Soru Ekle</strong></a>
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style>
</style>