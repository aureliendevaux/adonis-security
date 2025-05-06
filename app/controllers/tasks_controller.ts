import Task from '#models/task'
import { HttpContext } from '@adonisjs/core/http'

export default class TasksController {
  public async index({ auth, bouncer, response }: HttpContext) {
    if (await bouncer.with('TaskPolicy').denies('index')) {
      return response.forbidden()
    }

    const tasks = await Task.findManyBy({ userId: auth.user!.id })

    return response.json(tasks)
  }

  public async show({ bouncer, params, response }: HttpContext) {
    const task = await Task.find(params.id)

    if (!task) {
      return response.notFound()
    }

    if (await bouncer.with('TaskPolicy').denies('show', task)) {
      return response.forbidden()
    }

    return response.json(task)
  }

  public async store({ auth, bouncer, request, response }: HttpContext) {
    if (await bouncer.with('TaskPolicy').denies('store')) {
      return response.forbidden()
    }

    const { name } = request.all()
    const task = await Task.create({
      name,
      userId: auth.user!.id,
    })

    return response.created(task)
  }

  public async update({ bouncer, params, request, response }: HttpContext) {
    const task = await Task.find(params.id)

    if (!task) {
      return response.notFound()
    }

    if (await bouncer.with('TaskPolicy').denies('update', task)) {
      return response.forbidden()
    }

    const { name } = request.all()
    task.name = name
    const updatedTask = await task.save()

    return response.json(updatedTask)
  }

  public async delete({ bouncer, params, response }: HttpContext) {
    const task = await Task.find(params.id)

    if (!task) {
      return response.notFound()
    }

    if (await bouncer.with('TaskPolicy').denies('delete', task)) {
      return response.forbidden()
    }

    await task.delete()

    return response.noContent()
  }
}
