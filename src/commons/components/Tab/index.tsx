import React from 'react';
import { IconType } from 'react-icons';

interface TabProps {
    active?: boolean;
    title: string;
    handleClick: Function | any;
    icon: any | IconType;
}

import './Tab.style.scss';

export const Tab = ({
    active,
    title, 
    handleClick, 
    icon
}: TabProps) => {
    return (
    <div className="tab_item" onClick={handleClick}>
        <span className='tab_item_icon'> 
            {icon}
        </span>
        <span className={`tab_item_title ${active && 'tab_item_title--active'}`}>
            {title}
        </span>
    </div>)
}