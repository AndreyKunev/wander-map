import { UserInfoList } from '../../types/types';

import Card from '../Card/Card';
import UserItem from './UserItem/UserItem';

import './UsersList.css';

const UsersList = ({ userArr }: { userArr: UserInfoList }) => {
  if (userArr.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {userArr.map((user) => {
        return <UserItem key={user.id} user={user} />;
      })}
    </ul>
  );
};

export default UsersList;
