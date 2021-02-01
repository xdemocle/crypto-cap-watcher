/* eslint no-console: 0 */
import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        'App is being served from cache by a service worker.\n' +
          'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered(registration) {
      console.log('Service worker has been registered.')

      // Our service worker will automatically check for app updates on a routine basis.
      setInterval(() => {
        registration.update()
      }, 1000 * 60 * 60) // e.g. hourly checks
    },
    cached() {
      console.log('Content has been cached for offline use.')
    },
    updatefound() {
      console.log('New content is downloading.')
    },
    updated(registration) {
      console.log('New content is available; please refresh.')

      // Announces that a new service worker is available and waiting to be activated.
      document.dispatchEvent(
        new CustomEvent('swUpdated', { detail: registration })
      )
    },
    offline() {
      console.log(
        'No internet connection found. App is running in offline mode.'
      )
    },
    error(error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
