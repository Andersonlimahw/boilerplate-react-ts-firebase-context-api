import React from 'react';
export interface TitleProps {
    title: string;
    subTitle: string;
}

import './Title.style.scss';

export const Title: React.FC<TitleProps> = ({ title, subTitle }: TitleProps) => {
    return (
        <>
            <h2 className='title'>
                {title}
            </h2>
            <h3>
                {subTitle}
            </h3>
        </>
    )
}