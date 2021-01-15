<template>
  <div class="dialog-purchase">
    <slot />
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.dialog-purchase {
  background-color: var(--theme-background);
  height: 100vh;
  left: 0;
  overflow: auto;
  position: fixed;
  top: 0;
  width: 100%;
}
</style>
