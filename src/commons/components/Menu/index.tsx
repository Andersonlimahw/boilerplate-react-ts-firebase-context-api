import { useState } from 'react';
import { UserName } from './UserName';

import './Menu.style.scss';
import { Avatar } from './Avatar';
import { Badge } from './Badge';
import { useAuth } from '../../hooks/useAuth';
import { useBadgeVariant } from './hooks/useBadgeVariant';
import { Options } from './Options';
import { toast } from 'react-toastify';
import { TodoModel } from '../../models/todo';

export const Menu = () => {
    const { loading: userLoading, user } = useAuth();
    const [todosLoading, setTodosLoading] = useState(false);
    const [todoList, setTodoList] = useState<TodoModel[]>([]);


    const imcompletTodos = todoList.filter((todo) => !todo.completed);
    const badgVariant = useBadgeVariant({
        size: imcompletTodos.length,
    });

    const contentToShare = () => {

        const renderTodoItem = (todo : TodoModel) => {
            const icon = `[${todo.completed ? '✅' : ' '}]`;
            const todoItem = `\n${icon} ${todo.title}\n ${todo.categories && todo.categories[0].title}`;
            return todoItem;
        }
        const completedTodos = todoList.filter((x) => x.completed);

        let content = '\n';
        content += '\nThis is my todo list!\n'
        content += '\n DONE \n'
        completedTodos.forEach((todo) => {           
            content += renderTodoItem(todo);
        });
        content += '\n\n=================================\n';
        content += '\n TODO \n'
        imcompletTodos.forEach((todo) => {           
            content += renderTodoItem(todo);
        });
        content += '\n\n=================================';
        content += '\n\nSingup in the best todo platform!\n';
        return content;
    }

    async function shareTodos() {
        if (navigator.share) {
            await navigator.share({
                title: 'Hi, that`s my todo list',
                text: contentToShare(),
                url: window.location.href, 
            })
                .then(() => {
                    toast(`Nice! ${user.displayName} you shared your todos`, { type: 'success' });
                    console.log('Successfully shared')
                })
                .catch((error) => {
                    toast("Sorry :(, an error ocurred.", { type: 'error' });
                    console.error('Error sharing:', error)
                });
        } else {
            // Web Share API is not supported
            console.log('Web Share API not supported in this browser.');
        }
    }

    return (
        <nav className='menu'>
            <Avatar imageUrl={user.photoURL} />
            <UserName
                name={user.displayName}
                loading={userLoading}
            />
            <Badge
                variant={badgVariant}
            >
                {userLoading || todosLoading ? 0 : imcompletTodos.length}
            </Badge>
            <Options handleClick={() => shareTodos()} />
        </nav>)
}