<template>
  <div>
    <div class="grid">
      <section
        class="section__main col pa-1"
        :class="[!event.is_free && 'space-between']"
      >
        <article>
          <span class="date">{{ event.start_time | date }}</span>
          <h1>{{ event.name }}</h1>
          <p>
            <i>{{ event.description }}</i>
          </p>
        </article>

        <div class="col price-section">
          <span v-if="!event.is_free" class="price">N5000 - N2,000,000</span>

          <AppButton
            :disabled="event.is_sold_out"
            :label="
              event.is_sold_out
                ? 'Sold out'
                : event.is_free
                ? 'Register for free'
                : 'Buy tickets'
            "
            primary
            @click="handleClick(event)"
          />
        </div>
      </section>

      <section class="section__image pa-1">
        <div class="card image-card">
          <img alt="" :src="event.image" />
        </div>
      </section>

      <section class="section__divider pa-1">
        <div class="divider" />
      </section>

      <section class="section__venue col pa-1">
        <h5 class="mb-1">Venue</h5>
        <p class="title mb-1 pb-1">{{ event.venue }}</p>

        <a class="link-map row text--primary" href="#map">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0)">
              <path
                d="M0.75 4.5V16.5L6 13.5L12 16.5L17.25 13.5V1.5L12 4.5L6 1.5L0.75 4.5Z"
                stroke="#F5A623"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6 1.5V13.5"
                stroke="#F5A623"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 4.5V16.5"
                stroke="#F5A623"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="18" height="18" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <span>View map for directions</span>
        </a>
      </section>

      <section class="section__info pa-1">
        <h5 class="mb-1">Date and time</h5>
        <div class="title mb-1 pb-1">{{ event.start_time | dateFull }}</div>
        <template v-if="socialLinks">
          <h6 class="mb-1">Social links</h6>
          <ul class="social-links">
            <li v-for="(link, key) in socialLinks" :key="key">
              <a :href="link" rel="noopener">{{ link }}</a>
            </li>
          </ul>
        </template>
      </section>
    </div>
    <NuxtChild v-bind="{ event, ticketTypes }" />
  </div>
</template>

<script>
import isEmpty from 'lodash-es/isEmpty'

const testLinks = {
  facebook: 'https://facebook.com',
  twitter: 'https://twitter.com',
}

export default {
  async asyncData({ $axios, params }) {
    const { data: event } = await $axios.$get('events/' + params.id)
    const { data: ticketTypes } = await $axios.$get(
      'ticket-types/events/' + params.id
    )

    return { event, id: params.id, ticketTypes }
  },

  data: () => ({
    event: {},
    id: null,
    ticketTypes: [],
  }),

  head() {
    return {
      title: this.event.name,
    }
  },

  computed: {
    socialLinks() {
      if (!this.event.social_links) {
        return {}
      }
      const links = JSON.parse(this.event.social_links)
      return isEmpty(links) ? testLinks : links
    },
  },

  methods: {
    handleClick(event) {
      const path = event.is_free ? 'register' : 'purchase'

      this.$router.push(`/event/${event.id}/${path}`)
    },
  },
}
</script>

<style scoped>
article {
  margin-bottom: 30px;
}
article p {
  color: #4a4a4a;
  font-size: 18px;
  line-height: 28px;
}

h1 {
  margin: 23px 0 13px;
}

img {
  display: block;
  object-fit: cover;
  height: 100%;
  width: 100%;
}

.divider {
  margin: 24px 0;
}

.grid {
  grid-template-areas:
    'image   image   image   image   image   image'
    'main    main    main    main    main    main'
    'divider divider divider divider divider divider'
    'venue   venue   venue   venue   venue   venue'
    'info    info    info    info    info    info';
  grid-template-columns: repeat(6, 1fr);
  gap: 0;
  width: 100%;
}

.image-card {
  max-height: 430px;
  height: 100%;
}

.link-map {
  text-decoration: none;
}
.link-map span {
  font-size: 16px;
  text-decoration: none;
}
.link-map svg {
  margin-right: 10px;
}
.link-map:hover {
  text-decoration: underline;
}

.price-section {
  max-width: 348px;
}

.section__divider {
  grid-area: divider;
}
.section__info {
  grid-area: info;
}
.section__image {
  grid-area: image;
  min-height: 33vw;
}
.section__venue {
  grid-area: venue;
}
.section__main {
  grid-area: main;
}
.social-links {
  list-style-type: none;
  padding: 0;
}
.social-links li {
  margin-bottom: 10px;
}
.social-links a {
  color: #12122c;
  font-size: 18px;
  line-height: 20px;
  text-decoration: none;
}
.social-links a:hover {
  color: var(--theme-info);
  text-decoration: underline;
}

.text--number {
  margin-bottom: 20px;
}

@media (min-width: 600px) {
  .grid {
    grid-template-areas:
      'main    main    main    main    image   image'
      'divider divider divider divider divider divider'
      'venue   venue   venue   info    info    info';
  }
}

@media (min-width: 960px) {
  .grid {
    grid-template-areas:
      'main    main    main    image   image   image'
      'divider divider divider divider divider divider'
      'venue   venue   venue   info    info    info';
  }
  .section__image {
    grid-area: image;
    min-height: 430px;
  }
}
</style>
