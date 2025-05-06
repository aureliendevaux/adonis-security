import { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  public async login({ auth, request, response }: HttpContext) {
    const { email, password } = request.all()

    const token = await auth.use('api').authenticate()

    return response.json({ token })
  }
}
