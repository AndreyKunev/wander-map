import { FormEvent, useState, useContext, FC } from 'react';

import Card from '../../components/Card/Card';
import Input from '../../components/FormElements/Input/Input';
import Button from '../../components/FormElements/Button/Button';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

import {
	VALIDATOR_EMAIL,
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
	VALIDATOR_DATE,
} from '../../utils/validators';
import { useForm } from '../../hooks/form-hook';
import { useHttpClient } from '../../hooks/http-hook';
import { AuthContext } from '../../context/auth-context';

import './AuthPage.css';
import { isUserFormState } from '../../utils/formGuards';

const AuthPage: FC = () => {
	const auth = useContext(AuthContext);
	const [isLogin, setIsLogin] = useState(true);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const [formState, inputHandler, setFormData] = useForm(
		{
			type: 'user',
			email: {
				value: '',
				isValid: false,
			},
			password: {
				value: '',
				isValid: false,
			},
		},
		false
	);

	const switchModeHandler = () => {
		if (isLogin) {
			setFormData(
				{
					type: 'user',
					name: { value: '', isValid: false },
					email: { value: '', isValid: false },
					password: { value: '', isValid: false },
					birthDate: { value: '', isValid: false },
				},
				false
			);
		} else if (isUserFormState(formState.inputs)) {
			setFormData(
				{
					type: 'user',
					email: formState.inputs.email || {
						value: '',
						isValid: false,
					},
					password: formState.inputs.password || {
						value: '',
						isValid: false,
					},
				},
				formState.inputs.email?.isValid &&
					formState.inputs.password?.isValid
			);
		}

		setIsLogin((prevMode) => !prevMode);
	};

	const loginHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		let data;

		if (isLogin && isUserFormState(formState.inputs)) {
			try {
				data = await sendRequest(
					'http://localhost:3001/api/users/login',
					'POST',
					JSON.stringify({
						email: formState.inputs.email.value,
						password: formState.inputs.password.value,
					}),
					{
						'Content-Type': 'application/json',
					}
				);

				auth.login(data.user.id);
			} catch (error) {
				console.log(error);
			}
		} else if (isUserFormState(formState.inputs)) {
			try {
				data = await sendRequest(
					'http://localhost:3001/api/users/signup',
					'POST',
					JSON.stringify({
						name: formState.inputs.name!.value,
						email: formState.inputs.email.value,
						password: formState.inputs.password.value,
						birthDate: formState.inputs.birthDate!.value,
					}),
					{
						'Content-Type': 'application/json',
					}
				);

				auth.login(data.user.id);
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			<Card className='authentication'>
				{isLoading && <LoadingSpinner asOverlay />}
				<form className='authentication' onSubmit={loginHandler}>
					<div className='authentication__header'>
						<h2>{isLogin ? 'Welcome back!' : 'Create Account'}</h2>
					</div>
					{!isLogin && (
						<>
							<Input
								id='name'
								type='text'
								label='Name'
								element='input'
								validators={[VALIDATOR_REQUIRE()]}
								errorText='Please enter a valid name.'
								onInput={inputHandler}
							/>
							<Input
								id='birth-date'
								type='date'
								label='Birth Date'
								element='input'
								validators={[VALIDATOR_DATE()]}
								placeholder='dd/mm/yyyy'
								errorText='Please enter a valid date of birth'
								onInput={inputHandler}
							/>
						</>
					)}
					<Input
						id='email'
						type='email'
						label='Email'
						element='input'
						validators={[VALIDATOR_EMAIL()]}
						errorText='Please enter a valid email.'
						onInput={inputHandler}
					/>
					<Input
						id='password'
						type='password'
						label='Password'
						element='input'
						validators={[VALIDATOR_MINLENGTH(8)]}
						errorText='Password is invalid.'
						onInput={inputHandler}
					/>
					<Button type='submit' disabled={!formState.isValid}>
						{isLogin ? 'Login' : 'Register'}
					</Button>
				</form>
				<p>Don't have an account?</p>
				<Button inverse onClick={switchModeHandler}>
					{isLogin ? 'Create Account' : 'Switch to Login'}
				</Button>
			</Card>
		</>
	);
};

export default AuthPage;
