<template>
  <div>
    <div class="content-width pa-1">
      <h1>The best events happening now.</h1>
    </div>
    <section class="content-width grid">
      <EventCard v-for="event in events" :key="event.id" v-bind="{ event }" />
    </section>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const {
      data: { events },
    } = await $axios.$get('events')

    return { events }
  },

  data: () => ({
    events: [],
  }),
}
</script>

<style scoped>
div.content-width {
  max-width: 1200px;
}

.grid {
  max-width: 1280px;
  padding: 0.5rem;
}

@media (min-width: 660px) {
  h1 {
    margin: 100px 0 8px;
  }
  .grid {
    padding: 20px;
  }
}
</style>
