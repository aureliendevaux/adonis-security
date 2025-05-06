import Task from '#models/task'
import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class TaskPolicy extends BasePolicy {
  index(): AuthorizerResponse {
    return true
  }

  store(): AuthorizerResponse {
    return true
  }

  show(user: User, task: Task): AuthorizerResponse {
    return task.userId === user.id
  }

  update(user: User, task: Task): AuthorizerResponse {
    return task.userId === user.id
  }

  delete(user: User, task: Task): AuthorizerResponse {
    return task.userId === user.id
  }
}
