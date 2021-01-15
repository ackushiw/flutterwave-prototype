<template>
  <div class="dialog-purchase">
    <div class="row">
      <section>
        <div class="col content-width">
          <NuxtLink class="btn-close center row" :to="`/event/${event.id}`">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.5 4.5L4.5 13.5"
                stroke="#333333"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.5 4.5L13.5 13.5"
                stroke="#333333"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>Close</span>
          </NuxtLink>
          <h1>Purchase {{ event.name }}</h1>
          <span class="date">
            {{ event.start_time | date }}
          </span>

          <ul class="tickets-section">
            <li v-for="ticket in ticketTypes" :key="ticket.id" class="row">
              <div class="tickets-section__name">{{ ticket.name }}</div>
              <div>
                <span class="price">
                  {{ ticket.currency }}{{ ticket.price }}
                </span>
              </div>
              <div>0</div>
            </li>
          </ul>

          <span class="caption">
            Ticket sales ends on
            {{ event.tickets_sale_end_date | date }}
          </span>

          <pre>{{ event }}</pre>
          <pre>{{ ticketTypes }}</pre>
        </div>
      </section>
      <aside class="col">
        <h3 class="text--uppercase">Order summary</h3>
        <div class="divider" />
        <div class="divider" />

        <AppButton label="Continue" primary />

        <div class="row">
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.6204 25.0104L10.7736 25.8376C9.97042 26.1973 9.02503 25.944 8.50934 25.2309L7.32356 23.5911C7.16849 23.3767 6.9293 23.2386 6.66605 23.2115L4.65308 23.0045C3.77765 22.9144 3.08558 22.2224 2.99554 21.3469L2.7885 19.3339C2.76143 19.0707 2.62333 18.8315 2.40889 18.6764L0.769125 17.4907C0.0559958 16.975 -0.197319 16.0296 0.162423 15.2264L0.989612 13.3796C1.09779 13.1381 1.09779 12.8619 0.989612 12.6204L0.162423 10.7736C-0.197319 9.97042 0.0559958 9.02504 0.769125 8.50934L2.40889 7.32356C2.62333 7.16849 2.76143 6.9293 2.7885 6.66605L2.99554 4.65308C3.08558 3.77765 3.77765 3.08557 4.65308 2.99553L6.66605 2.7885C6.9293 2.76143 7.16849 2.62333 7.32356 2.40889L8.50934 0.769125C9.02503 0.0559959 9.97042 -0.197319 10.7736 0.162423L12.6204 0.989606C12.8619 1.09778 13.1381 1.09778 13.3796 0.989606L15.2264 0.162423C16.0296 -0.197319 16.975 0.0559959 17.4907 0.769125L18.6764 2.40889C18.8315 2.62333 19.0707 2.76143 19.3339 2.7885L21.3469 2.99553C22.2224 3.08557 22.9144 3.77765 23.0045 4.65308L23.2115 6.66605C23.2386 6.9293 23.3767 7.16849 23.5911 7.32356L25.2309 8.50934C25.944 9.02504 26.1973 9.97042 25.8376 10.7736L25.0104 12.6204C24.9022 12.8619 24.9022 13.1381 25.0104 13.3796L25.8376 15.2264C26.1973 16.0296 25.944 16.975 25.2309 17.4907L23.5911 18.6764C23.3767 18.8315 23.2386 19.0707 23.2115 19.3339L23.0045 21.3469C22.9144 22.2224 22.2224 22.9144 21.3469 23.0045L19.3339 23.2115C19.0707 23.2386 18.8315 23.3767 18.6764 23.5911L17.4907 25.2309C16.975 25.944 16.0296 26.1973 15.2264 25.8376L13.3796 25.0104C13.1381 24.9022 12.8619 24.9022 12.6204 25.0104ZM7.98252 11.2433L6.40654 12.8193L11.6971 18.1099L19.8185 9.98847L18.2426 8.41249L11.6971 14.9579L7.98252 11.2433Z"
              fill="#2D9CDB"
            />
          </svg>

          <div class="col">
            <span>100% customer protection</span>
            <span>Money back guarantee</span>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    event: {
      required: true,
      type: Object,
    },

    ticketTypes: {
      default: () => [],
      type: Array,
    },
  },

  data: () => ({
    showForm: false,
  }),
}
</script>

<style scoped>
aside {
  background-color: #fff;
  border-top-left-radius: 10px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  height: 100vh;
  max-width: 470px;
  padding: 51px;
  width: 100%;
}

h1 {
  margin-top: 60px;
}

h3 {
  letter-spacing: 0.065em;
  margin-bottom: 30px;
}

section {
  flex: 1;
}

.btn-close {
  background: #fff;
  border-radius: 60px;
  box-shadow: -1px 2px 4px rgba(0, 0, 0, 0.25);
  color: #333;
  font-family: var(--font-alt);
  font-size: 1.5rem;
  height: 49px;
  line-height: 2rem;
  text-decoration: none;
  width: 124px;
}
.btn-close svg {
  margin-right: 7px;
}

.content-width {
  max-width: 791px;
  padding: 51px;
}

.date {
  color: #4f4f4f;
  font-family: 'OpenSans', sans-serif;
}

.dialog-purchase {
  background-color: var(--theme-background);
  height: 100vh;
  left: 0;
  overflow: auto;
  position: fixed;
  top: 0;
  width: 100%;
}

.divider {
  background-color: #bdbdbd;
}

.tickets-section {
  list-style-type: none;
  margin: 81px 0 14px;
  padding: 0;
}

.tickets-section__name {
  font-size: 2rem;
}
.tickets-section li {
  align-items: center;
  border-bottom: 1px solid #bdbdbd;
  padding: 2rem 0;
}
.tickets-section li div {
  flex: 1;
}
</style>
