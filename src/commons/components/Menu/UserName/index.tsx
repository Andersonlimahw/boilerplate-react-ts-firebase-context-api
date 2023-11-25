import { FC } from "react";
import { SkeletonItem } from "../../Skeleton";

type UserNameProps = {
    name: string;
    loading: boolean;
}
export const UserName: FC<UserNameProps> = ({ name, loading } : UserNameProps) => {
    if(loading) {
        return (
            <div style={{ width: '128px' }}>
                <SkeletonItem />
            </div>
            
        )
    }
    return(<h4>{ loading ? <SkeletonItem data-testid='skeleton-loading' /> :  name}</h4>);
}