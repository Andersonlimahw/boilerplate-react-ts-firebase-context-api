import { TodoModel } from '../commons/models/todo';

// Interfaces
export enum TodoActions {
    SET_TODOS = 'SET_TODOS',
    ADD = 'ADD', 
    TOGGLE_COMPLETED = 'TOGGLE_COMPLETED',
    DELETE = 'DELETE'
}

interface TodoState {
    updatedDate: Date;
    todoList: TodoModel[];
}

interface ActionInput {
    type: TodoActions, 
    payload: TodoModel | TodoModel[] | any
}

export const initialState : TodoState = {
    updatedDate: new Date(),
    todoList: []
};

export function TodoReducer(state : TodoState, action : ActionInput) {
    switch(action.type) {
        case TodoActions.SET_TODOS: 
        return {
            ...state,
            updatedDate: new Date(),
            todoList: action.payload
        }
        case TodoActions.ADD: 
            return {
                ...state,
                updatedDate: new Date(),
                todoList: [action.payload, ...state.todoList]
            }
        case TodoActions.DELETE: 
            return {
                ...state,
                updatedDate: new Date(),
                todoList: state.todoList.filter((todo) => todo.id !== action.payload.id)
            }
        case TodoActions.TOGGLE_COMPLETED: 
        return {
            ...state,
            updatedDate: new Date(),
            todoList: [...state.todoList.map((todo) => {
                if(todo.id === action.payload.id) {
                    return { 
                        ...todo,
                        completed: !todo.completed
                    }
                }
                return todo;
            })]
        }
        default:
            return state;

    }
}
