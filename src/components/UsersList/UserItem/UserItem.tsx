import { Link } from 'react-router-dom';

import { AvatarProps, UserInfo } from '../../../types/types';

import Avatar from '../../Avatar/Avatar';
import Card from '../../Card/Card';

import './UserItem.css';

const UserItem = ({ user }: { user: UserInfo }) => {
  const avatarProps: AvatarProps = {
    image: user.image,
    alt: user.name,
  };

  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${user.id}/places`}>
          <div className="user-item__image">
            <Avatar avatar={avatarProps} />
          </div>
          <div className="user-item__info">
            <h2>{user.name}</h2>
            <h3>
              {user.placeCount} {user.placeCount === 1 ? 'Place' : 'Places'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
