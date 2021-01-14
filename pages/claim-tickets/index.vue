<template>
  <div class="col">
    <FwInput
      autocomplete="email"
      class="mb-1"
      label="Email address"
      type="email"
      :value="email"
      @input="(val) => $emit('input', val)"
    />
    <AppButton label="Confirm and send ticket" primary @click="handleSubmit" />
  </div>
</template>

<script>
export default {
  props: {
    email: {
      default: '',
      type: String,
    },
  },

  methods: {
    handleSubmit() {
      if (!this.email) {
        alert('no email')
        return
      }
      this.$router.push('/claim-tickets/success')
    },
  },
}
</script>
