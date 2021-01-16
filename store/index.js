const getCacheId = ({ id }) => `fw_event_${id}`

const buildEvent = (event) => {
  const image = event.image
    ? event.image.replace('&w=2850', '&w=560')
    : '/undraw_not_found.png'
  return {
    ...event,
    image,
  }
}

const getPriceRange = (tickets) => {
  if (!tickets || !tickets.length) {
    return {
      max: 0,
      min: 0,
    }
  }

  const prices = tickets.map(({ price }) => price)

  return {
    max: Math.max(...prices),
    min: Math.min(...prices),
  }
}

export const actions = {
  async fetchAllEvents({ commit, dispatch }) {
    const {
      data: { events },
    } = await this.$axios.$get('events')

    const eventsCollection = {}

    events.forEach((event) => {
      eventsCollection[getCacheId(event)] = buildEvent(event)
      dispatch('fetchTickets', event.id)
    })

    commit('SET_EVENTS', eventsCollection)

    return events
  },

  async fetchEvent({ commit, dispatch, state }, eventId) {
    const { data } = await this.$axios.$get('events/' + eventId)

    const events = {
      ...state.events,
      [getCacheId(data)]: buildEvent(data),
    }

    commit('SET_EVENTS', events)
    dispatch('fetchTickets', eventId)
  },

  async fetchTickets({ commit, state }, eventId) {
    const { data } = await this.$axios.$get('ticket-types/events/' + eventId)

    commit('SET_EVENT_TICKETS', {
      ...state.ticketsByEvent,
      [getCacheId({ id: eventId })]: data,
    })
  },
}

export const getters = {
  events: (state, getters) =>
    Object.values(state.events).map(getters.getEventData),

  eventById: (state, getters) => (id) =>
    getters.getEventData(state.events[getCacheId({ id })]),

  getEventData: (_state, getters) => (event) => {
    if (!event) {
      return {}
    }
    const tickets = getters.ticketsByEventId(event.id) || []

    let currency = ''
    let priceRange = {
      max: 0,
      min: 0,
    }

    if (tickets.length) {
      priceRange = getPriceRange(tickets)

      // TODO: Account for multiple currencies
      currency = tickets[0].currency
    }

    return {
      ...event,
      currency,
      is_free: event.is_free || priceRange.max === 0,
      priceRange,
      tickets,
    }
  },

  ticketsByEventId: (state) => (id) => state.ticketsByEvent[getCacheId({ id })],
}

export const mutations = {
  SET_EVENTS(state, events) {
    state.events = events
  },

  SET_EVENT_TICKETS(state, ticketsByEvent) {
    state.ticketsByEvent = ticketsByEvent
  },
}

export const state = () => ({
  events: {},
  ticketsByEvent: {},
})
