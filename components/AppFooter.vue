<template>
  <footer>
    <div class="center content-width row pa-1 space-between">
      <span class="caption">Copyright 2019. Flutterwave inc</span>
      <section class="center row space-between">
        <nuxt-link class="caption" to="/terms">Terms & Conditions</nuxt-link>
        <nuxt-link class="caption" to="/privacy">Privacy Policy</nuxt-link>
      </section>
    </div>
  </footer>
</template>

<script>
export default {}
</script>

<style scoped>
a {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}

footer {
  padding-bottom: 3rem;
}

footer section {
  width: 250px;
}
</style>
