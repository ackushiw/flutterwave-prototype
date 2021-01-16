<template>
  <div class="dialog-purchase">
    <div class="row">
      <section class="flex--1">
        <div class="col content-width">
          <NuxtLink
            class="btn-close flex--center row"
            :to="`/event/${event.id}`"
          >
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

          <ul class="list list--tickets">
            <li
              v-for="ticket in ticketTypes"
              :key="ticket.id"
              class="list__item row"
            >
              <div class="flex--1 list__name--tickets">{{ ticket.name }}</div>
              <div class="flex--1">
                <span class="text--number">
                  {{ ticket.currency | unit }}{{ ticket.price }}
                </span>
              </div>
              <div class="flex--center flex--end row">
                <button
                  class="btn-quantity flex--center row"
                  @click="updateCart(ticket, -1)"
                >
                  <svg
                    width="10"
                    height="4"
                    viewBox="0 0 10 4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 0C9.10457 0 10 0.895431 10 2C10 3.10457 9.10457 4 8 4H2C0.89543 4 0 3.10457 0 2C0 0.895431 0.895431 0 2 0H8Z"
                      fill="#828282"
                    />
                  </svg>
                </button>
                <span class="quantity text--number">
                  {{ cart[ticket.id] ? cart[ticket.id].quantity : 0 }}
                </span>
                <button
                  class="btn-quantity flex--center row"
                  @click="updateCart(ticket, 1)"
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 4.99005C10 5.49288 9.59238 5.9005 9.08955 5.9005H8.00717C6.90656 5.9005 6.01434 6.79272 6.01434 7.89333V8.97541C6.01434 9.54128 5.55562 10 4.98975 10C4.42389 10 3.96516 9.54128 3.96516 8.97541V7.88308C3.96516 6.78813 3.07753 5.9005 1.98258 5.9005H0.910448C0.407621 5.9005 0 5.49288 0 4.99005C0 4.48722 0.407621 4.0796 0.910448 4.0796H1.98258C3.07753 4.0796 3.96516 3.19197 3.96516 2.09702V1.02459C3.96516 0.458724 4.42389 0 4.98975 0C5.55562 0 6.01434 0.458724 6.01434 1.02459V2.08678C6.01434 3.18738 6.90656 4.0796 8.00717 4.0796H9.08955C9.59238 4.0796 10 4.48722 10 4.99005Z"
                      fill="#828282"
                    />
                  </svg>
                </button>
              </div>
            </li>
          </ul>

          <span class="caption">
            Ticket sales ends on
            {{ event.tickets_sale_end_date | date }}
          </span>
        </div>
      </section>

      <aside class="cart col">
        <header class="block-spacing">
          <button
            v-if="showForm"
            class="cart__toolbar-button flex--center row"
            @click="showForm = false"
          >
            <svg
              class="cart__toolbar-button-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 12H5"
                stroke="#333333"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 19L5 12L12 5"
                stroke="#333333"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span class="text--bold">Go back</span>
          </button>
          <h3 v-else class="text--uppercase">Order summary</h3>
        </header>

        <div class="block-spacing divider" />

        <FormUserInfo
          v-if="showForm"
          class="block-spacing"
          :disabled="!total"
          :submit-label="
            total ? `Pay ${$options.filters.unit(currency)}${total}` : 'Pay'
          "
          @submit="handlePayment"
        >
          <div class="flex--center row space-between total">
            <span class="list__item tezt--bold text--uppercase">
              Total payment
            </span>
            <span class="text--number">
              {{ total ? currency : null | unit }}{{ total }}
            </span>
          </div>
        </FormUserInfo>

        <template v-else>
          <ul class="list list--cart list--cart-items">
            <template v-for="(item, key) in cart">
              <li
                v-if="item.quantity"
                :key="key"
                class="list__item flex--center row space-between"
              >
                <div class="text--bold">
                  {{ item.quantity }} - {{ item.name }}
                </div>
                <div class="list__item-price">
                  {{ item.currency | unit }}{{ item.price }}
                </div>
              </li>
            </template>
          </ul>

          <div class="block-spacing divider" />

          <ul class="list list--cart">
            <li class="list__item flex--center row space-between">
              <div class="text--bold">Sub-total</div>
              <div class="list__item-price">
                {{ subtotal ? currency : null | unit }}{{ subtotal }}
              </div>
            </li>
            <li class="list__item flex--center row space-between">
              <div class="text--bold">VAT</div>
              <div class="list__item-price">
                {{ vatAdded ? currency : null | unit }}{{ vatAdded || '-' }}
              </div>
            </li>
          </ul>

          <div class="block-spacing flex--center row space-between total">
            <span class="list__item text--bold text--uppercase">
              Total payment
            </span>
            <span class="text--number">
              {{ total ? currency : null | unit }}{{ total }}
            </span>
          </div>

          <AppButton
            class="block-spacing"
            :disabled="!total"
            label="Continue"
            primary
            @click="showForm = true"
          />
        </template>

        <div class="guarantee row">
          <svg
            class="guarantee__icon"
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
            <span class="guarantee__top text--bold">
              100% customer protection
            </span>
            <span class="guarantee__bottom">Money back guarantee</span>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
import isEmpty from 'lodash-es/isEmpty'

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
    // TODO: recognize / switch currency
    currency: 'NGN',
    cart: {},
    showForm: false,
    vat: 0.15,
  }),

  computed: {
    paymentData() {
      return {
        tx_ref: this.generateReference(),
        amount: this.total > 50000 ? 50000 : this.total, // Hack to for test api
        currency: this.currency,
        payment_options: 'card,mobilemoney,mobilemoneyghana,ussd',
        redirect_url: '',
        customer: null,
        customizations: {
          title: this.event.name,
          // TODO: create description with list of tickets
          description: 'Tickets for ' + this.event.name,
          logo: 'https://flutterwave-ackushiw.netlify.app/icon.png',
        },
        onclose: this.closedPaymentModal,
      }
    },
    subtotal() {
      if (isEmpty(this.cart)) {
        return 0
      }

      return Object.values(this.cart).reduce((subtotal, ticket) => {
        subtotal += ticket.quantity * ticket.price
        return subtotal
      }, 0)
    },

    total() {
      return this.subtotal + this.vatAdded
    },

    vatAdded() {
      return this.subtotal * this.vat
    },
  },

  methods: {
    closedPaymentModal() {
      // TODO: Handle closed flutterwave modal
    },

    generateReference() {
      const date = new Date()
      return date.getTime().toString()
    },

    async handlePayment({ email, name, phone }) {
      let paymentResponse
      try {
        paymentResponse = await this.asyncPayWithFlutterwave({
          ...this.paymentData,
          customer: {
            email,
            name,
            phone_number: phone,
          },
        })
      } catch (error) {
        // TODO: Notify user of error
      }

      if (paymentResponse.status !== 'successful') {
        // TODO: Notify user of unsuccessful payment
        return
      }

      const tickets = Object.values(this.cart).reduce((order, cartItem) => {
        if (cartItem.quantity > 0) {
          order[cartItem.id] = cartItem.quantity
        }
        return order
      }, {})

      try {
        await this.$axios.$post('orders', {
          base_amount: this.subtotal,
          email,
          event_id: this.event.id,
          name,
          phone,
          tickets_bought: tickets,
          value_added_tax: this.vatAdded,
        })
        // TODO: Notify user of order
      } catch (error) {
        // TODO: Notify user of error
      }
    },

    updateCart(ticket, number) {
      if (!ticket) {
        return
      }

      const existingQuantity = this.cart[ticket.id]
        ? this.cart[ticket.id].quantity
        : 0
      const updatedQuantity = existingQuantity + number

      if (updatedQuantity > ticket.qty_available) {
        // TODO: alert user of quantity limit
        return
      }

      this.cart = {
        ...this.cart,
        [ticket.id]: {
          ...ticket,
          quantity: updatedQuantity > 0 ? updatedQuantity : 0,
        },
      }
    },
  },
}
</script>

<style scoped>
.block-spacing {
  margin-bottom: 30px;
}

.cart {
  background-color: #fff;
  border-top-left-radius: 10px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  height: 100vh;
  max-width: 470px;
  padding: 51px;
  width: 100%;
}

.cart__toolbar-button {
  background-color: #fff;
  color: #333;
  cursor: pointer;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.065em;
}

h1 {
  margin-top: 60px;
}

h3 {
  letter-spacing: 0.065em;
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

.cart__toolbar-button-icon,
.btn-close svg {
  margin-right: 7px;
}

.btn-quantity {
  background-color: #fff;
  border-radius: 20px;
  box-shadow: -1px 1px 2px rgba(0, 0, 0, 0.25);
  height: 20px;
  padding: 2px;
  width: 20px;
}

.btn-close:focus,
.btn-quantity:focus {
  outline: none;
  box-shadow: -1px 1px 2px rgba(0, 0, 0, 0.25),
    0 0 0 2px var(--theme-info) inset;
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

.guarantee__bottom {
  color: #828282;
  font-size: 13px;
  letter-spacing: 0.5px;
  line-height: 14px;
}
.guarantee__icon {
  margin-right: 10px;
}
.guarantee__top {
  color: #333;
  font-size: 14px;
  letter-spacing: 0.5px;
  line-height: 14px;
}

.list {
  list-style-type: none;
  padding: 0;
}

.list--cart-items {
  min-height: 237px;
}
.list--cart .list__item {
  color: #333;
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 20px;
}

.list--cart .list__item-price {
  color: #4f4f4f;
}

.list--tickets {
  margin: 81px 0 14px;
}

.list__name--tickets {
  font-size: 2rem;
}
.list--tickets .list__item {
  align-items: center;
  border-bottom: 1px solid #bdbdbd;
  padding: 2rem 0;
}

.quantity {
  margin: 0 16px;
}

.total {
  align-items: flex-end;
}
</style>
