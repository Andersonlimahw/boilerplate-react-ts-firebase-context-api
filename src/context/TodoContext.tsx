import { onSnapshot } from "firebase/firestore";
import { FC, createContext, useState, useEffect, useReducer, HtmlHTMLAttributes, FormEvent, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";

import { AddTodoInput } from "../commons/interfaces/addTodoInput";
import { TodoModel } from "../commons/models/todo";
import { TodoService } from "../services/todos";
import { initialState, TodoActions, TodoReducer } from "./TodoReducer";
import { useAuth } from '../commons/hooks/useAuth';
import { CategoryModel } from "../commons/models/category";
import { generateId } from "../commons/utils";

const defaultFunction = () => { };
type TodoContextProps = {
    handleSubmit(event: any): void,
    handleTitleUpdate(title: string): void,
    toggleCompleted(todo: TodoModel): void,
    addTodo({ title }: AddTodoInput): void,
    deleteTodo(id: string): void;
    editTodo(todo: TodoModel): void,
    setIsEditing: (value : boolean) => void,
    titleValue: string;
    todoList: TodoModel[],
    todosLoading: boolean;
    isEditing: boolean;
    selectedTodo?: TodoModel;
    setSelectedTodo: (value: TodoModel) => void,
    selectedsCategories?: CategoryModel[];
    addCategory: (categories: CategoryModel) => void,
}

const initialValue: TodoContextProps = {
    handleSubmit: (event: any) => defaultFunction,
    handleTitleUpdate: (title: string) => defaultFunction,
    toggleCompleted: (todo: TodoModel) => defaultFunction,
    addTodo: ({ title }: AddTodoInput) => defaultFunction,
    deleteTodo: (id: string) => defaultFunction,
    editTodo: (todo: TodoModel) => defaultFunction,    
    setIsEditing: (value: boolean) => defaultFunction,
    todosLoading: false,
    titleValue: "",
    todoList: [], 
    isEditing: false,
    selectedTodo: undefined,
    setSelectedTodo: (value: TodoModel) => defaultFunction,
    selectedsCategories: undefined,
    addCategory: (categories: CategoryModel) => defaultFunction,
}

const TodoContext = createContext(initialValue);

const TodoProvider: FC<any> = ({ children }) => {
    // Services
    // Context:
    const { user } = useAuth();
    const todoService = new TodoService(user.uid as string);

    // State:
    const [state, dispatch] = useReducer(TodoReducer, initialState);
    const [titleValue, setTitleValue] = useState<string>('');
    const [selectedsCategories, handleSelectedCategories] = useState<CategoryModel[]>([]);
    const [todosLoading, setTodosLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState<TodoModel>();

    async function addTodo({ title, categories }: AddTodoInput) {
        const newTodo : TodoModel = {
            code: generateId(),
            userId: user.uid as string, 
            title, 
            categories
        };      
        setTodosLoading(true);
        await todoService.create(newTodo)
            .then(() => {
                setTitleValue('');
                handleSelectedCategories([]);
            })
            .catch(() => toast("Sorry :(, an error ocurred.", { type: 'error' }))
            .finally(() => setTodosLoading(false));

    }

    async function deleteTodo(id: string) {
        setTodosLoading(true);
        await todoService.delele(id)
            .then(() => {
                setTitleValue('');
                handleSelectedCategories([]);
            })
            .catch(() => toast("Sorry :(, an error ocurred.", { type: 'error' }))
            .finally(() => setTodosLoading(false));

    }

    async function toggleCompleted(todo: TodoModel) {
        setTodosLoading(true);
        await todoService.patch({
            ...todo,
            completed: !todo.completed
        }).then(() => {
            if (todo.completed) {
                toast('🍋 dont give up, you can!', { type: 'success', autoClose: 2000 });
            }
        })
            .catch(() => toast("Sorry :(, an error ocurred.", { type: 'error', autoClose: 3000 }))
            .finally(() => setTodosLoading(false));
    }

    async function editTodo(todo: TodoModel) {
        setTodosLoading(true);
        await todoService.patch({...todo }).then(() => {
            setIsEditing(false);
            handleSelectedCategories([]);
         })
        .catch(() => toast("Sorry :(, an error ocurred.", { type: 'error', autoClose: 3000 }))
        .finally(() => setTodosLoading(false));
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        if (!titleValue || titleValue.trim() === '') {
            toast("Please fill todo", { type: 'error' });
            return;
        }
        if(isEditing) {
            return editTodo({
                ...selectedTodo,
                title: titleValue, 
                completed: false,
                categories: selectedsCategories
            } as TodoModel);
        }
        return addTodo({
            title: titleValue,
            categories: selectedsCategories || [],
        });
    }

    function handleTitleUpdate(title: string) {
        setTitleValue(title);
    }

    function orderTodosByTitle(a: any, b: any) {
        if (a.created.seconds! > b.created.seconds!) {
            return -1;
        }
        if (a.title! > b.title!) {
            return 1;
        }
        return 0;
    }


    async function handleTodosOnSnapshot() {
        setTodosLoading(true);

        await todoService.get()
            .then(async (response) => {
                setTodosLoading(false);
                await onSnapshot(response, (querySnapshot) => {
                    const queryResult = querySnapshot.docs.map((document) => ({
                        id: document.id,
                        data: document.data()
                    }));
                    const result = queryResult.map((x) => ({
                        ...x.data,
                        userId: x.data.userId,
                        id: x.id,
                    })).sort((a, b) => orderTodosByTitle(a, b));

                    dispatch({
                        type: TodoActions.SET_TODOS,
                        payload: result
                    });
                })
            }).catch(() => toast('Sorry!, Error on get your todos', { type: 'error' }))
            .finally(() => setTodosLoading(false))
    }

    function addCategory(category : CategoryModel) {
        // clear categories
        handleSelectedCategories([]);

        handleSelectedCategories(() => {
            return [category];
        });
    }

    // Hooks:
    useEffect(() => {
        if (user && user.uid) {
            (async () => {
                await handleTodosOnSnapshot();
            })();
        } else {
            console.log('User not loged');
        }
    }, [user]);

    const contextValue: TodoContextProps = {
        todoList: state.todoList,
        todosLoading,
        titleValue,
        handleTitleUpdate,
        handleSubmit,
        toggleCompleted,
        addTodo,
        deleteTodo,
        editTodo,
        isEditing,
        setIsEditing, 
        selectedTodo,
        setSelectedTodo, 
        selectedsCategories, 
        addCategory        
    }

    return (
        <TodoContext.Provider value={contextValue}>
            {children}
            <ToastContainer />
        </TodoContext.Provider>
    )
}

export {
    TodoContext,
    TodoProvider
}