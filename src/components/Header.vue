<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#"></a>
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
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <router-link to="/" tag="a" class="navbar-brand">
          <a class="nav-link">Oyun Sayfası</a>
        </router-link>
      </ul>
      <ul class="navbar-nav flex-row ml-md-auto d-none d-md-flex">
        <router-link to="/new-question" tag="a" class="navbar-brand">
          <a class="nav-link">Soru Bağışla</a>
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