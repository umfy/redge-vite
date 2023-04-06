import type { Todo } from "@/stores/todo";
import Joi from 'joi'

const schema = Joi.object({
  userId: Joi.number(),
  id: Joi.number().allow(null),
  title: Joi.string().allow(''),
  completed: Joi.boolean()
})

export function validateTodo(todo: Todo){
    const {error} = schema.validate(todo)
    if (error) {
        return error
    }
    return true
}