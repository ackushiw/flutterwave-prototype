<template>
  <DialogPurchase>
    <h1>Purchase page</h1>
    <pre>{{ event }}</pre>
  </DialogPurchase>
</template>

<script>
export default {
  props: {
    event: {
      required: true,
      type: Object,
    },

    ticketType: {
      required: true,
      type: Array,
    },
  },
}
</script>
