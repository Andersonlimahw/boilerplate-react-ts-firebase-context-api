type AvatarProps = {
    imageUrl: string;
}

import './Avatar.style.scss';

export const Avatar = ({ imageUrl } : AvatarProps) => {
    return(<img
        src={imageUrl}
        alt="avatar"
        className="avatar"
    />)
}

export default Avatar;