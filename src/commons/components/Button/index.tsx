import React from 'react';

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {

}

import './Button.style.scss';
export const Button: React.FC<ButtonProps> = ({ children, ...otherProps }: ButtonProps) => {
    return (
        <button {...otherProps} type='submit' className='button'>
            {children}
        </button>
    );
}