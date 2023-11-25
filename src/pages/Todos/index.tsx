import { useContext, useEffect, useState } from 'react';
import { Button } from '../../commons/components/Button';
import { Title } from '../../commons/components/Title';

import './Todos.style.scss';
import { TodoContext } from '../../context/TodoContext';
import { TodoModel } from '../../commons/models/todo';
import { Menu } from '../../commons/components/Menu';
import { toast } from 'react-toastify';
import { useAuth } from '../../commons/hooks/useAuth';
import { useNavigate } from 'react-router';
import { SkeletonItem } from '../../commons/components/Skeleton';
import { Tab } from '../../commons/components/Tab';
import { ImCheckboxChecked, ImCheckboxUnchecked, ImPriceTag } from 'react-icons/im';
import { TodoItem } from '../../commons/components/Todo';

export const Todos = () => {
    const navigate = useNavigate();
    const tabs = [
        {
            id: 1,
            title: 'todo',
            icon: <ImCheckboxUnchecked />
        },
        {
            id: 2,
            title: 'done',
            icon: <ImCheckboxChecked />
        }
    ];
    const [selectedTab, setSelectedTab] = useState('todo');

    const { loading: userLoading, user } = useAuth();
    const {
        todoList,
        todosLoading,
        handleSubmit,
        titleValue,
        handleTitleUpdate,
        isEditing,        
    } = useContext(TodoContext);


    useEffect(() => {
        if (!userLoading && !user.uid) {
            toast('Please Login', { type: 'info' });
            navigate('/');
        }
        console.log('### [GetUser] TODOS: => ', user.uid, 'loading => ', userLoading);
    }, [user.uid, userLoading])




    const Sample = () => (<Title title="🍋 Lets" subTitle="code" />)
    const Loading = () => (
        <ul>
            {
                todoList.map((todo, index) => (
                    <li key={todo.id}>
                        <div style={{ width: '100%' }}>
                            <SkeletonItem key={index} />
                        </div>
                    </li>
                ))
            }
        </ul>
    )


    const Content = () => {
        const isLoading = todosLoading || userLoading;
        if (isLoading) {
            return Loading();
        }

        return Sample()
    }


    return (
        <>
            <Menu />
            <section className='container'>
                <Title
                    title='Sample'
                    subTitle='Sample'
                />               
                { Content() }
            </section>

        </>

    )

}