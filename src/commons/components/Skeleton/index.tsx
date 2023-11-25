import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

interface SkeletonProps {
    count?: number;
    baseColor?: string;
    highlightColor?: string;
    variant?: 'circle' | 'reactangle';
    height?: string;
}
export const SkeletonItem = ({
    count,
    baseColor = "#f1f1f1",
    highlightColor = "#ccc", 
    variant = 'reactangle', 
    height = '16px'
}: SkeletonProps) => {
    const borderRadiusValue = variant === 'circle' ? '80%' : '0.8rem';
    return (
        <SkeletonTheme
            baseColor={baseColor}
            highlightColor={highlightColor}
        >
             <Skeleton 
                borderRadius={borderRadiusValue} 
                height={height}
                count={count}
                data-testid="skeleton-item"
            />

        </SkeletonTheme>
    )
}