import { FC, FormEvent, useContext } from 'react';

import { useForm } from '../../hooks/form-hook';
import Input from '../../components/FormElements/Input/Input';
import Button from '../../components/FormElements/Button/Button';
import { AuthContext } from '../../context/auth-context';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../utils/validators';
import { useHttpClient } from '../../hooks/http-hook';
import { isPlaceFormState } from '../../utils/formGuards';

import './NewPlace.css';

const NewPlace: FC = () => {
	const auth = useContext(AuthContext);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [formState, inputHandler] = useForm(
		{
			type: 'place',
			title: {
				value: '',
				isValid: false,
			},
			description: {
				value: '',
				isValid: false,
			},
			address: {
				value: '',
				isValid: false,
			},
		},
		false
	);

	const placeSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (isPlaceFormState(formState.inputs)) {
			try {
				await sendRequest(
					'http://localhost:3001/api/places/',
					'POST',
					JSON.stringify({
						title: formState.inputs.title.value,
						description: formState.inputs.description.value,
						address: formState.inputs.address?.value,
						creator: auth.userId,
					}),
					{'Content-Type': 'application/json'}
				);
				// TODO - redirect after submitting new place
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<>
		<ErrorModal error={error} onClear={clearError}/>
		<form className='place-form' onSubmit={placeSubmitHandler}>
			{isLoading && <LoadingSpinner asOverlay/>}
			<h2>Create a New Wander Point!</h2>
			<Input
				id='title'
				type='text'
				label='Title'
				element='input'
				validators={[VALIDATOR_REQUIRE()]}
				errorText='Please enter a valid title.'
				onInput={inputHandler}
			/>
			<Input
				id='description'
				element='textarea'
				label='Description'
				validators={[VALIDATOR_MINLENGTH(5)]}
				errorText='Description must be at least 5 characters.'
				onInput={inputHandler}
			/>
			<Input
				id='address'
				label='Address'
				element='input'
				validators={[VALIDATOR_REQUIRE()]}
				errorText='Please enter a valid address.'
				onInput={inputHandler}
			/>
			<Button type='submit' disabled={!formState.isValid}>
				Create Wander Point
			</Button>
		</form>
		</>
	);
};

export default NewPlace;
