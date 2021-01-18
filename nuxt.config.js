import axios from 'axios'

export default {
  env: {
    fwKey: 'FLWPUBK_TEST-689e890449313d34531131d279e2ed27-X',
  },
  modern: true,
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Flutterwave events',
    meta: [
      {
        content: 'The best events happening now.',
        hid: 'description',
        name: 'description',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'normalize.css/normalize.css',
    '~assets/styles/global.css',
    '~assets/styles/theme.css',
  ],

  generate: {
    fallback: true,
    routes: () =>
      axios
        .get('https://eventsflw.herokuapp.com/v1/events')
        .then(({ data: { data } }) =>
          data.events.map(({ id }) => '/event/' + id)
        ),
  },

  loading: {
    color: '#F5A623',
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~plugins/filters', '~plugins/flutterwave'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: 'https://eventsflw.herokuapp.com/v1/',
  },

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  pwa: {
    manifest: {
      name: 'Flutterwave Events',
      short_name: 'Flutterwave',
    },
    meta: {
      description: 'The best events happening now.',
      name: 'Flutterwave Events',
      ogHost: process.env.URL,
      short_name: 'Flutterwave',
      theme_color: '#F5A623',
    },
    workbox: {
      offlineStrategy: 'StaleWhileRevalidate',
      runtimeCaching: [
        // Cache unsplash images
        {
          urlPattern: 'https://images.unsplash.com/.*',
          handler: 'CacheFirst',
          strategyPlugins: [
            {
              use: 'Expiration',
              config: {
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
              },
            },
          ],
        },
      ],
    },
  },
}
