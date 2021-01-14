<template>
  <label class="col">
    <span class="label">{{ label }}</span>
    <input v-model="input" v-bind="{ ...$attrs, type }" v-on="listeners" />
  </label>
</template>

<script>
export default {
  props: {
    label: {
      required: true,
      type: String,
    },
    type: {
      default: 'text',
      type: String,
    },
    value: {
      default: '',
      type: String,
    },
  },

  computed: {
    input: {
      get() {
        return this.value
      },
      set(input) {
        this.$emit('input', input)
      },
    },

    listeners() {
      const { input, ...listeners } = this.$listeners
      return listeners
    },
  },
}
</script>

<style scoped>
span {
  margin-bottom: 14px;
}

input {
  background-color: #fdfdfd;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1.4rem;
  height: 51px;
  padding: 1rem;
}
</style>
