/*
|--------------------------------------------------------------------------
| Define HTTP limiters
|--------------------------------------------------------------------------
|
| The "limiter.define" method creates an HTTP middleware to apply rate
| limits on a route or a group of routes. Feel free to define as many
| throttle middleware as needed.
|
*/

import limiter from '@adonisjs/limiter/services/main'

export const throttle = limiter.define('global', () => {
  return limiter.allowRequests(2).every('1 minute')
})

export const differentUserThrottle = limiter.define('tasks', ({ auth, request }) => {
  if (!auth.user) {
    return limiter.allowRequests(1).every('1 hour').usingKey('guest')
  }

  if (auth.user.id === 1) {
    return limiter.allowRequests(1_000_000).usingKey(`admin_ip_${request.ip()}`)
  }

  return limiter
    .allowRequests(5)
    .every('1 minute')
    .blockFor('30 seconds')
    .usingKey(`ip_${request.ip()}`)
})
