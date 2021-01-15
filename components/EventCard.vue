<template>
  <NuxtLink class="event-block" :to="`/event/${event.id}`">
    <section class="event-block__image">
      <img alt="" loading="lazy" :src="event.image" />
    </section>
    <section class="event-block__details">
      <span class="date date--small">{{ event.start_time | date }}</span>
      <h3>{{ event.name }}</h3>

      <span
        v-if="event.is_sold_out"
        class="details-price details-price--sold-out"
        v-text="'Sold out'"
      />
      <span
        v-else-if="event.is_free"
        class="details-price details-price--free"
        v-text="'Free'"
      />
      <span v-else class="details-price">N5000 - N2,000,000</span>
    </section>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    event: {
      required: true,
      type: Object,
    },
    image: {
      default: null,
      type: String,
    },
    name: {
      default: '',
      type: String,
    },
  },
}
</script>

<style scoped>
.event-block {
  color: #4f4f4f;
  max-width: 400px;
  text-decoration: none;
  width: 100%;
}

.event-block__image {
  border-radius: 0.5rem;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.306764);
  margin-bottom: 7px;
  max-height: 225px;
  overflow: hidden;
}
.event-block__image img {
  display: block;
  width: 100%;
  max-height: 225px;
  object-fit: cover;
}

.event-block__details {
  padding: 1rem 0;
}

.date {
  display: inline-block;
  margin-bottom: 5px;
}

.details-price {
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.5px;
}

.details-price--free {
  color: var(--theme-success);
  font-weight: bold;
}

.details-price--sold-out {
  color: var(--theme-error);
  font-weight: bold;
}
</style>
