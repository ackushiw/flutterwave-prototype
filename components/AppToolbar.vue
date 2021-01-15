<template>
  <header>
    <div class="content-width flex--center row pa-1 space-between">
      <NuxtLink class="logo-container" to="/">
        <AppLogo />
      </NuxtLink>
      <section class="flex--center row space-between">
        <AppButton dense label="I didn’t get my tickets" to="/claim-tickets" />
        <AppButton dense label="Create your own event" primary />
      </section>
    </div>
  </header>
</template>

<script>
export default {}
</script>

<style scoped>
header {
  min-height: 56px;
  left: 0;
  position: fixed;
  position: sticky;
  top: 0;
  width: 100%;
}

header > div {
  background-color: rgba(242, 242, 242, 0.8);
  backdrop-filter: blur(2px);
  max-width: 1280px;
  padding: 2rem 1rem 0.5rem;
}

section {
  min-width: 388px;
}

.logo-container {
  display: block;
  height: 34px;
  max-width: 34px;
  overflow: hidden;
  transition: max-width 200ms linear;
  width: 100%;
}

@media (min-width: 600px) {
  .logo-container {
    max-width: 200px;
  }
}
</style>
