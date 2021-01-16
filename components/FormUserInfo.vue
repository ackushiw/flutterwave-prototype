<template>
  <form class="col" @submit.prevent="handleSubmit({ email, name, phone })">
    <FwInput
      v-model="name"
      autocomplete="name"
      class="form-block"
      label="Full name"
      name="name"
    />
    <FwInput
      v-model="email"
      autocomplete="email"
      class="form-block"
      label="Email address"
      name="email"
      type="email"
    />
    <FwInput
      v-model="phone"
      autocomplete="tel"
      class="form-block"
      label="Phone number"
      name="phone"
      type="tel"
    />

    <div class="col form-block">
      <slot />
    </div>

    <AppButton
      v-bind="{ disabled, label: submitLabel }"
      primary
      type="submit"
    />
  </form>
</template>

<script>
export default {
  props: {
    disabled: {
      default: false,
      type: Boolean,
    },

    submitLabel: {
      default: 'Submit',
      type: String,
    },
  },

  data: () => ({
    email: '',
    name: '',
    phone: '',
    store: null,
  }),

  mounted() {
    this.store = window.sessionStorage
    this.email = this.store.getItem('user-email') || ''
    this.name = this.store.getItem('user-name') || ''
    this.phone = this.store.getItem('user-phone') || ''
  },

  methods: {
    handleSubmit({ email, name, phone }) {
      this.$emit('submit', { email, name, phone })

      try {
        this.store.setItem('user-email', email)
        this.store.setItem('user-name', name)
        this.store.setItem('user-phone', phone)
      } catch (_error) {}
    },
  },
}
</script>

<style scoped>
.form-block {
  margin-bottom: 30px;
}
</style>
