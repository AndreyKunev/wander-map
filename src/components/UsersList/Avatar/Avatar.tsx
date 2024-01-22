import { AvatarProps } from '../../../types/types';

import './Avatar.css';

const Avatar = ({ avatar }: { avatar: AvatarProps }) => {
  return (
    <div className={'avatar' + (avatar.className || '')} style={avatar.style}>
      <img
        src={avatar.image}
        alt={avatar.alt}
        style={{ width: avatar.width, height: avatar.width }}
      />
    </div>
  );
};

export default Avatar;
