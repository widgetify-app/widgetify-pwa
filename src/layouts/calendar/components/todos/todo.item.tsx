import type { Todo } from '../../interface/todo.interface'

interface Prop {
	todo: Todo
	toggleTodo: (id: string) => void
	deleteTodo: (id: string) => void
}

export function TodoItem({ todo, deleteTodo, toggleTodo }: Prop) {
	return (
		<div
			key={todo.id}
			className="flex items-center gap-2 p-3 rounded-lg bg-gray-700/30 group"
		>
			<input
				type="checkbox"
				checked={todo.completed}
				onChange={() => toggleTodo(todo.id)}
				className="w-4 h-4 border-gray-500 rounded"
			/>
			<span
				className={`flex-1 text-gray-200 ${todo.completed ? 'line-through text-gray-400' : ''}`}
			>
				{todo.text}
			</span>
			<button
				onClick={() => deleteTodo(todo.id)}
				className="text-red-400 transition-opacity opacity-0 group-hover:opacity-100 hover:text-red-300"
			>
				✕
			</button>
		</div>
	)
}
