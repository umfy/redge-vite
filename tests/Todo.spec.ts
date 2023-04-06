import { describe, it, expect } from 'vitest'
import { validateTodo } from '../src/components/todo/TodoFormValidator'
import { TodoClass } from '../src/stores/todo'

describe('Validate Todo Form', () => {
  it('should pass with default data', () => {
    const todo = new TodoClass()
    const validationResult = validateTodo(todo)
    expect(validationResult).toBe(true)
  }),
  it('fails when userId is not a number', () => {
    const todo = new TodoClass({userId: 'one'})
    console.log(todo)
    const validationResult = validateTodo(todo)
    expect(validationResult).not.toBe(true)
  })
  it('fails when completed is not a boolean', () => {
    const todo = new TodoClass({completed: 0})
    console.log(todo)
    const validationResult = validateTodo(todo)
    expect(validationResult).not.toBe(true)
  })
})
