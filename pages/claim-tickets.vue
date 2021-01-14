<template>
  <div>
    <div class="background_lines" />
    <section class="center content-width pa-1 col">
      <h2
        class="text--center"
        v-text="'Enter your email and we’ll send your tickets right away!'"
      />
      <div class="card col">
        <NuxtChild :email="email" @input="updateEmail" />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: '',
    store: null,
  }),

  mounted() {
    this.store = window.sessionStorage
    this.email = this.store.getItem('tickets-email') || ''
  },

  methods: {
    updateEmail(email) {
      this.email = email

      try {
        this.store.setItem('tickets-email', email)
      } catch (_error) {}
    },
  },
}
</script>

<style scoped>
h2 {
  margin-bottom: 13px;
  margin-top: 100px;
  max-width: 390px;
}

.card {
  padding: 51px;
  padding-bottom: 50px;
  max-width: 470px;
  width: 100%;
}
</style>
