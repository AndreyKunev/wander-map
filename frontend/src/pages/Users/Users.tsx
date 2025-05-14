import { useEffect, useState } from 'react';

import UsersList from '../../components/UsersList/UsersList';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const Users = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [loadedUsers, setLoadedUsers] = useState([]);

	useEffect(() => {
		const sendReq = async () => {
			setIsLoading(true);
			try {
				const res = await fetch('http://localhost:3001/api/users/');

				const resData = await res.json();

				if (!res.ok) {
					throw new Error(resData.message);
				}

				setLoadedUsers(resData.users);
			} catch (err) {
				if (err instanceof Error) {
					setError(err.message);
				}
			}
			setIsLoading(false);
		};
		sendReq();
	}, []);

	const errorHandler = () => {
		setError(null);
	};

	return (
		<>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner asOverlay/>
        </div>
      )}
			{!isLoading && loadedUsers && <UsersList userArr={loadedUsers} />}
		</>
	);
};

export default Users;
