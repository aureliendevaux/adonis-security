import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import { differentUserThrottle } from '#start/limiter'

const loginController = () => import('#controllers/login_controller')
const registrationController = () => import('#controllers/registration_controller')
const tasksController = () => import('#controllers/tasks_controller')

router.post('/login', [loginController, 'login'])
router.post('/register', [registrationController, 'register'])

router
  .group(() => {
    router.get('tasks', [tasksController, 'index'])
    router.get('tasks/:id', [tasksController, 'show'])
    router.post('tasks', [tasksController, 'store'])
    router.put('tasks/:id', [tasksController, 'update'])
    router.delete('tasks/:id', [tasksController, 'delete'])
  })
  .use(middleware.auth())
  .use(differentUserThrottle)
