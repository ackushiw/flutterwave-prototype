<template>
  <NuxtLink
    v-if="to"
    :class="classNames"
    :disabled="disabled"
    :to="to"
    v-on="$listeners"
  >
    <span class="flex--center row">{{ label }}</span>
  </NuxtLink>

  <button v-else :class="classNames" :disabled="disabled" v-on="$listeners">
    <span class="flex--center row">{{ label }}</span>
  </button>
</template>

<script>
export default {
  props: {
    dense: {
      default: false,
      type: Boolean,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    label: {
      required: true,
      type: String,
    },
    primary: {
      default: false,
      type: Boolean,
    },
    to: {
      default: null,
      type: String,
    },
  },

  computed: {
    classNames() {
      return [this.dense && 'dense', this.primary && 'theme--primary']
    },
  },
}
</script>

<style scoped>
button,
a {
  border-radius: 4px;
  color: #333;
  cursor: pointer;
  display: block;
  font-family: 'Flutterwave Bold', sans-serif;
  font-size: 1.166rem;
  font-weight: bold;
  height: 50px;
  padding: 12px 16px;
  text-align: center;
  text-decoration: none;
}

a:disabled,
button:disabled {
  cursor: not-allowed;
}

button.dense {
  font-size: 1rem;

  /* Design pixel perfect */
  font-size: 12.2008px;
  height: 38px;
}

a:not(.theme--primary):hover {
  text-decoration: underline;
}

span {
  height: 100%;
}

.theme--primary {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  text-transform: uppercase;
}

.theme--primary:disabled {
  background-color: lightgray !important;
  box-shadow: none;
  border: 2px dashed grey;
}

.theme--primary:not(:disabled):hover {
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5);
  filter: hue-rotate(-10deg);
}
</style>
