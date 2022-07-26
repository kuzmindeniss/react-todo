import React from 'react';
import {TodoI} from "../types";

interface TodoItemPropsI {
  item: TodoI;
	onClick: (todo: TodoI) => void
}

const TodoItem: React.FC<TodoItemPropsI> = ({ item, onClick }) => {
  return <li
    className={
      "todos__item" + (item.isCompleted ? " todos__item--completed" : "")
    }
    key={item.id}
    onClick={() => onClick(item)}
    data-testid="todo-item"
  >
    {item.text}
  </li>
}

export default TodoItem;
