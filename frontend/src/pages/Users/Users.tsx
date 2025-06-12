import { useEffect, useState } from 'react';

import UsersList from '../../components/UsersList/UsersList';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

import { useHttpClient } from '../../hooks/http-hook';

const Users = () => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [loadedUsers, setLoadedUsers] = useState([]);

	useEffect(() => {
		const getUsers = async () => {
			try {
				const data = await sendRequest(
					'http://localhost:3001/api/users/'
				);

				setLoadedUsers(data.users);
			} catch (err) {
				if (err instanceof Error) {
					console.log(err.message);
				}
			}
		};

		getUsers();
	}, [sendRequest]);

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div className='center'>
					<LoadingSpinner asOverlay />
				</div>
			)}
			{!isLoading && loadedUsers && <UsersList userArr={loadedUsers} />}
		</>
	);
};

export default Users;
