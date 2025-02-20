import type jalaliMoment from 'jalali-moment'
import { useEffect, useState } from 'react'
import type { Todo } from '../../interface/todo.interface'
import { formatDateStr } from '../../utils'
import { TodoInput } from './todo-input'
import { TodoItem } from './todo.item'

type TodoProp = {
	currentDate: jalaliMoment.Moment
}
export function Todos({ currentDate }: TodoProp) {
	const [todos, setTodos] = useState<Todo[]>([])

	useEffect(() => {
		const savedTodos = localStorage.getItem('calendar-todos')
		if (savedTodos) {
			setTodos(JSON.parse(savedTodos))
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('calendar-todos', JSON.stringify(todos))
	}, [todos])

	const selectedDateStr = formatDateStr(currentDate.clone())

	const selectedDateTodos = todos.filter((todo) => todo.date === selectedDateStr)
	const addTodo = (text: string) => {
		const newTodo: Todo = {
			id: Date.now().toString(),
			date: selectedDateStr,
			text,
			completed: false,
		}
		setTodos([...todos, newTodo])
	}

	const toggleTodo = (todoId: string) => {
		setTodos(
			todos.map((todo) =>
				todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
			),
		)
	}

	const deleteTodo = (todoId: string) => {
		setTodos(todos.filter((todo) => todo.id !== todoId))
	}

	return (
		<div className="mb-6">
			<h4 className="mb-2 text-lg text-gray-300">یادداشت‌های روز</h4>
			<TodoInput onAdd={addTodo} />
			<div className="h-40 space-y-2 overflow-y-auto lg:h-32">
				{selectedDateTodos.map((todo) => (
					<TodoItem
						key={todo.id}
						todo={todo}
						deleteTodo={() => deleteTodo(todo.id)}
						toggleTodo={() => toggleTodo(todo.id)}
					/>
				))}
			</div>
		</div>
	)
}
