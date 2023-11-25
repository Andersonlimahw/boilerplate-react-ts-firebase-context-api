import React, { useContext, useEffect } from 'react';
import { Button } from '../../commons/components/Button';
import { ImGoogle } from 'react-icons/im';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import './Login.style.scss';
export const Login = () => {
    const navigate = useNavigate();
    const { login, user } = useContext(AuthContext);

    const navigateTodosPage = () =>  {
        navigate('/todos');
    }
    
    const handleLogin = async () => {
        try {
            await login();
            navigateTodosPage();
        } catch (ex) {
            toast("Sorry :(, an error ocurred.", { type: 'error' })
        }

    }

    useEffect(() => {
        if(user.authorized && user.id !== "" && user.uid) {
            toast(`Welcome back, ${user.displayName}`, { type: 'info' });
            setTimeout(() => {
                navigateTodosPage();    
            }, 500);            
        }
    }, [user, user.authorized]);

    const imageIndex = () => Math.floor(Math.random() * 5);

    return (
        <section className='login'>

            <div className="login_banner" style={{  backgroundImage: `url(/assets/images/login/${imageIndex()}.jpg)`}}>
                <div className='login_overlay'>
                    <div className="login_descriptions">
                        <div className="login_title">
                            Hi, welcome to
                            <br />
                            <small>
                                🍋 Boilerplate
                                replace to your pages
                            </small>
                           
                        </div>
                        <div className='login_action'>
                            <Button
                                onClick={handleLogin}
                            >
                                <ImGoogle className='login_action_icon' />
                                Login
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}