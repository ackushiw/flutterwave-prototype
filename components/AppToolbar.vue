<template>
  <header class="toolbar" :class="[isScrolled && 'toolbar--scrolled']">
    <div
      class="toolbar__content content-width flex--center row pa-1 space-between"
    >
      <NuxtLink aria-label="Home" class="toolbar__logo" to="/">
        <AppLogo />
      </NuxtLink>
      <section class="toolbar__buttons flex--center row space-between">
        <AppButton dense label="I didn’t get my tickets" to="/claim-tickets" />
        <AppButton
          class="hidden--mobile"
          dense
          label="Create your own event"
          primary
        />
        <AppButton class="hidden--desktop" dense label="Create event" primary />
      </section>
    </div>
  </header>
</template>

<script>
export default {
  data: () => ({
    isScrolled: false,
  }),
  mounted() {
    window.addEventListener('scroll', this.onScroll, { passive: true })
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll(e) {
      this.isScrolled = window.top.scrollY !== 0
    },
  },
}
</script>

<style scoped>
.toolbar {
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0);
  left: 0;
  min-height: 56px;
  position: fixed;
  position: sticky;
  top: 0;
  transition: box-shadow, transform 150ms var(--easing-standard);
  width: 100%;
}

.toolbar--scrolled {
  background-color: rgba(242, 242, 242, 0.6);
  backdrop-filter: blur(2px);
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
  transform: translateY(-20px);
}

.toolbar__content {
  max-width: 1280px;
  padding: 2rem 1rem 0.5rem;
}

.toolbar__logo {
  display: block;
  height: 34px;
  max-width: 34px;
  overflow: hidden;
  transition: max-width 200ms linear;
  width: 100%;
}

@media (min-width: 600px) {
  .toolbar__logo {
    max-width: 200px;
  }
}

@media (min-width: 960px) {
  .toolbar__buttons {
    min-width: 388px;
  }
}
</style>
