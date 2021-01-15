<template>
  <form class="col" @submit.prevent="$emit('submit', { email, name, phone })">
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
  }),
}
</script>

<style scoped>
.form-block {
  margin-bottom: 30px;
}
</style>
