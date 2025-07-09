import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import PlaceList from '../../components/PlaceList/PlaceList';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useHttpClient } from '../../hooks/http-hook';

const UserPlaces = () => {
	const { userId } = useParams();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [places, setPlaces] = useState([]);

	useEffect(() => {
		const getPlaces = async () => {
			try {
				const data = await sendRequest(
					`http://localhost:3001/api/places/user/${userId}`,
					'GET'
				);
				setPlaces(data.places);
			} catch (err) {
				console.log(err);
			}
		};
		getPlaces();
	}, [sendRequest, userId]);

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div className='center'>
					<LoadingSpinner asOverlay/>
				</div>
			)}
			{!isLoading && places && <PlaceList placeArr={places} />}
		</>
	);
};

export default UserPlaces;
