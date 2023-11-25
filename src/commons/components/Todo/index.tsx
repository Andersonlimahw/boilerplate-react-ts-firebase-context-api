import { FC, useContext } from 'react';
import { ImCheckboxChecked, ImCheckboxUnchecked, ImPencil } from 'react-icons/im';

import { BsTrash } from 'react-icons/bs';

import { TodoContext } from '../../../context/TodoContext';
import { TodoModel } from "../../models/todo";


export interface TodoProps {
    todo: TodoModel;
}

import './Todo.style.scss';
export const TodoItem: FC<TodoProps> = ({ todo }: TodoProps) => {
    const {
        toggleCompleted,
        deleteTodo,
        handleTitleUpdate,
        setIsEditing,
        setSelectedTodo,
        addCategory
    } = useContext(TodoContext) as any;

    const { title, completed, categories } = todo;
    const customClass = completed ? 'completed' : 'todo';

    const Actions = () => (
        <div className='actions'>
            <span
                onClick={() => toggleCompleted(todo)}
                className='complete_todo_icon'
            >
                {
                    completed ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />
                }
            </span>

        </div>
    )

    const TodoTitle = () => (
        <div>
            <div className={`content ${customClass}`}>
                <h4> {title} </h4>
                <span
                    onClick={() => deleteTodo(todo.id)}
                    className='remove_todo_icon'
                >
                    <BsTrash />
                </span>
                <span className='edit_todo_icon'>
                    <ImPencil onClick={() => {
                        setIsEditing(true);
                        handleTitleUpdate(title);
                        setSelectedTodo(todo);
                        addCategory(todo.categories![0] || {})
                    }} />
                </span>
            </div>

            <div className='categories_list'>
                {
                    categories && categories.map((category) => (
                        <small className='category_item' id={category.id}>
                            {category.title}
                        </small>)
                    )
                }
            </div>
        </div>

    )

    const Todo = () => (
        <li className={customClass}>
            <Actions />
            <TodoTitle />
        </li>
    )
    return (
        <Todo />
    )
}