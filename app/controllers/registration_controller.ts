import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class RegistrationController {
  public async register({ request, response }: HttpContext) {
    const { email, password, fullName } = request.all()
    const hashedPassword = await hash.make(password)

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    })

    const token = await User.accessTokens.create(user)

    return response.json({
      user,
      token,
    })
  }
}
