import React from 'react';
import {render, screen} from '@testing-library/react';
import Todos from './Todos';
import userEvent from "@testing-library/user-event";

describe('Todos', () => {
	test('Todos input rendered', () => {
		render(<Todos />);
		const input = screen.getByRole('textbox');

		expect(input).toBeInTheDocument();
	});

	test('Todos input value changes', () => {
		render(<Todos />);
		const input = screen.getByRole('textbox');
		const value = 'Test value';

		userEvent.type(input, value);
		expect(input).toHaveValue(value);
	});

	test('Create a new todo', () => {
		render(<Todos />);
		const input = screen.getByRole('textbox');
		const newTodoText = 'New test value';

		expect(screen.queryByTestId('todo-item')).not.toBeInTheDocument();
		userEvent.type(input, `${newTodoText}{enter}`);
		expect(screen.getByTestId('todo-item')).toBeInTheDocument();
		expect(screen.getByTestId('todo-item')).toHaveTextContent(newTodoText);
		expect(input).toHaveValue('');
	})

	test('Create several todos', () => {
		render(<Todos />);
		const input = screen.getByRole('textbox');
		const newTodoText = 'New test value';

		expect(screen.queryByTestId('todo-item')).not.toBeInTheDocument();
		userEvent.type(input, `${newTodoText}-1{enter}`);
		userEvent.type(input, `${newTodoText}-2{enter}`);
		userEvent.type(input, `${newTodoText}-3{enter}`);
		expect(screen.getAllByTestId('todo-item')).toHaveLength(3);
		expect(input).toHaveValue('');
	})

	test('Todos are completed on click', () => {
		render(<Todos />);
		const input = screen.getByRole('textbox');
		const newTodoText = 'New test value';

		userEvent.type(input, `${newTodoText}-1{enter}`);
		userEvent.type(input, `${newTodoText}-2{enter}`);
		userEvent.type(input, `${newTodoText}-3{enter}`);

		const todos = screen.getAllByTestId('todo-item');
		expect(todos).toHaveLength(3);

		userEvent.click(todos[1]);
		userEvent.click(todos[2]);

		expect(todos[0]).not.toHaveClass('todos__item--completed');
		expect(todos[1]).toHaveClass('todos__item--completed');
		expect(todos[2]).toHaveClass('todos__item--completed');
	})
})
