import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class LoginController {
  public async login({ request, response }: HttpContext) {
    const { email, password } = request.all()
    const hashedPassword = await hash.make(password)
    const user = await User.findByOrFail({ email, password: hashedPassword })

    if (!user) {
      return response.unauthorized()
    }

    const token = await User.accessTokens.create(user)

    return response.json(token)
  }
}
