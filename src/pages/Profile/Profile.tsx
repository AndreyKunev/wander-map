import { FC } from 'react';

import Avatar from '../../components/Avatar/Avatar';
import Card from '../../components/Card/Card';

import './Profile.css';

import { AvatarProps } from '../../types/types';

const Profile: FC = () => {
  // dummy data
  const USER = {
    id: 'u1',
    name: 'John Doe',
    image: 'https://images.pexels.com/photos/2167039/pexels-photo-2167039.jpeg',
    placeCount: 1,
    bio: 'I like going to various destinations in Europe, America and India. Always curious about new places!',
  };

  const avatarProps: AvatarProps = {
    image: USER.image,
    alt: USER.name,
    style: {
      height: '10rem',
      width: '10rem',
    },
  };

  return (
    <Card className="profile">
      <div className="profile-avatar">
        <Avatar avatar={avatarProps} />
      </div>
      <h2>{USER.name}</h2>
      <p className="profile-wander-points">
        You have {USER.placeCount} wander{' '}
        {USER.placeCount > 1 ? 'points' : 'point'}, keep wandering!
      </p>
      <h3>Bio:</h3>
      <p>{USER.bio}</p>
    </Card>
  );
};

export default Profile;
