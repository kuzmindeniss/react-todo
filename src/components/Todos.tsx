import React, {KeyboardEvent, useRef, useState} from 'react';
import { TodoI } from "types";
import uniqid from 'uniqid';
import TodoItem from "./TodoItem";

const Todos: React.FC = () => {
	const [todos, setTodos] = useState<TodoI[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);

	const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		const text = e.target.value;
		if (e.key !== 'Enter' || !text.trim()) return;
		setTodos(state => [...state, { id: uniqid(), text }]);
		if (!inputRef.current) return;
		inputRef.current.value = '';
	}

	const todoClicked = (todo: TodoI) => {
		setTodos(state => state.map(item => {
			if (item.id === todo.id) {
				return {
					...item,
					isCompleted : !item.isCompleted,
				}
			}
			return item;
		}))
	}

	const getTodos = (): JSX.Element[] => {
		const uncompletedTodosList: JSX.Element[] = [];
		const completedTodosList: JSX.Element[] = [];
		todos.forEach(item => {
			if (!item.isCompleted) {
				uncompletedTodosList.push(<TodoItem key={item.id} item={item} onClick={todoClicked} />)
			} else {
				completedTodosList.push(<TodoItem key={item.id} item={item} onClick={todoClicked} />)
			}
		});
		return uncompletedTodosList.concat(completedTodosList);
	}

	return <main className="todos">
		<div className="todos__input-wrapper">
			<input type="text" className="todos__input"
						 placeholder="Add a new task..." onKeyDown={onKeyDown} ref={inputRef}
			/>
		</div>
		<ul className="todos__list">{getTodos()}</ul>
	</main>
}

export default Todos;
