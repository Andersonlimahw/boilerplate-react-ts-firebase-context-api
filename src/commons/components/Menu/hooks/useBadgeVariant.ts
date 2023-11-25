interface useBadgeVariantProps {
    size: number;
}
export const useBadgeVariant = ({ size } : useBadgeVariantProps) => {
    const DANGER_LIMIT_VALUE = 10;
    const WARNING_LIMIT_VALUE = 6;

    const badgVariant = () => {
        if(size > DANGER_LIMIT_VALUE) {
             return 'danger';
        }
        if(size > WARNING_LIMIT_VALUE && size <= DANGER_LIMIT_VALUE) {
             return 'warning'
        }
        return 'default';
     }

     return badgVariant();
}