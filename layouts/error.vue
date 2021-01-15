<template>
  <div>
    <div class="background_lines" />
    <section class="flex--center col">
      <div class="card pa--large">
        <div class="col">
          <h1 class="text--center mb--large">{{ error.statusCode }}</h1>
          <p class="text--center mb--large">{{ error.message }}</p>

          <AppButton label="Home" primary to="/" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      default: () => ({
        message: 'Unknown error',
        statusCode: 500,
      }),
      type: Object,
    },
  },
}
</script>

<style scoped>
section {
  min-height: 60vh;
}
</style>
