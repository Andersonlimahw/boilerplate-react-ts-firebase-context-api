import { FC, ReactNode } from "react";

import './Badge.style.scss';

interface BadgeProps {
    variant: 'default' | 'warning' | 'danger',
    children: ReactNode | ReactNode[],
}
export const Badge: FC<BadgeProps> = ({ variant, children }) => {
    return (<div className={`badge ${variant}`}> {children} </div>);
}

export default Badge;