import { format, isValid } from 'date-fns'
import Vue from 'vue'

const parseDate = (value) => {
  if (!value) {
    return null
  }
  const date = new Date(value)
  return isValid(date) ? date : null
}

const formatDate = (value, stringFormat = 'do MMMM yyyy') => {
  const date = parseDate(value)
  return date ? format(new Date(value), stringFormat) : null
}

const formatFullDate = (value) =>
  formatDate(value, 'eeee, MMMM do yyyy, HH:mmaaaa')

Vue.filter('date', formatDate)
Vue.filter('dateFull', formatFullDate)
