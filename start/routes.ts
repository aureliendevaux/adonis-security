import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const loginController = () => import('#controllers/login_controller')
const registrationController = () => import('#controllers/registration_controller')

router.post('/login', [loginController, 'login'])
router.post('/register', [registrationController, 'register'])

router
  .get('/private', async ({ auth }) => {
    return {
      isAuthenticated: auth.isAuthenticated,
      hello: 'private',
    }
  })
  .use(middleware.auth())
