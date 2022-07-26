import React from 'react';
import {render, screen} from '@testing-library/react';
import TodoItem from './TodoItem';
import {TodoI} from "types";

describe('TodoItem', () => {
	test('TodoItem rendered', () => {
		const fn = jest.fn();
		const todoData: TodoI = {
			id: '1',
			text: 'Test todo',
		}
		render(<TodoItem item={todoData} onClick={fn}/>);
		const todo = screen.getByTestId('todo-item');
		expect(todo).toBeInTheDocument();
		expect(todo).toHaveTextContent(todoData.text);
	});
})
