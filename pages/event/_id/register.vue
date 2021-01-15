<template>
  <div class="dialog-register center col">
    <div class="card col">
      <header class="center row space-between">
        <h3
          class="text--uppercase"
          v-text="registered ? '' : 'Register for free'"
        />
        <NuxtLink :to="`/event/${event.id}`">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18"
              stroke="#333333"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="#333333"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </NuxtLink>
      </header>

      <section v-if="registered" class="center col section__registered">
        <svg
          width="137"
          height="137"
          viewBox="0 0 137 137"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M125.583 63.2476V68.4993C125.576 80.8089 121.59 92.7864 114.22 102.646C106.849 112.505 96.4894 119.717 84.685 123.207C72.8806 126.698 60.2642 126.278 48.7174 122.013C37.1707 117.747 27.3122 109.862 20.6124 99.5359C13.9126 89.2093 10.7303 76.9937 11.5402 64.7108C12.3502 52.4279 17.1089 40.7358 25.1067 31.3784C33.1045 22.021 43.9128 15.4996 55.9197 12.7868C67.9267 10.074 80.4889 11.3151 91.7328 16.3251"
            stroke="#F5A623"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M125.583 22.8335L68.5 79.9739L51.375 62.8489"
            stroke="#F5A623"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <p class="text--center">
          You have successfully registered for the nathan cole experience.
        </p>
      </section>

      <section v-else class="col">
        <div class="divider" />

        <FwInput class="form__input" label="Full name" />
        <FwInput class="form__input" label="Email address" />
        <FwInput class="form__input" label="Phone number" />

        <AppButton label="Register" primary @click="registered = true" />
      </section>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    event: {
      required: true,
      type: Object,
    },
  },

  data: () => ({
    registered: false,
  }),
}
</script>

<style scoped>
.card {
  height: 584px;
  max-width: 470px;
  padding: 50px 51px 66px;
  width: 100%;
}
.dialog-register {
  background-color: rgba(51, 51, 51, 0.45);
  height: 100%;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
}

.divider {
  background-color: #bdbdbd;
}

header,
.divider,
.form__input {
  margin-bottom: 30px;
}

.section__registered p {
  font-weight: 600;
}

.section__registered svg {
  margin: 12px 0 56px;
}
</style>
