import router from '@adonisjs/core/services/router'

const loginController = () => import('#controllers/login_controller')
const registrationController = () => import('#controllers/registration_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/login', [loginController, 'login'])
router.post('/register', [registrationController, 'register'])
