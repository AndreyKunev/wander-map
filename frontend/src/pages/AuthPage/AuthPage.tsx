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
	VALIDATOR_DATE
} from '../../utils/validators';
import { useForm } from '../../hooks/form-hook';
import { AuthContext } from '../../context/auth-context';

import './AuthPage.css';

const AuthPage: FC = () => {
	const auth = useContext(AuthContext);
	const [isLogin, setIsLogin] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const [formState, inputHandler, setFormData] = useForm(
		{
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
		if (!isLogin) {
			if ('email' in formState.inputs && 'password' in formState.inputs) {
				setFormData(
					{
						...formState.inputs,
						name: undefined,
					},
					formState.inputs.email.isValid &&
						formState.inputs.password.isValid
				);
			}
		} else {
			setFormData(
				{
					...formState.inputs,
					name: {
						value: '',
						isValid: false,
					},
				},
				false
			);
		}

		setIsLogin((prevMode) => !prevMode);
	};

	const loginHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (isLogin) {
			console.log('test');
		} else {
			let res;
			let data;
			setIsLoading((prevMode) => !prevMode);

			try {
				if (
					'name' in formState.inputs &&
					'email' in formState.inputs &&
					'password' in formState.inputs
				) {
					res = await fetch(
						'http://localhost:3001/api/users/signup',
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								name: formState.inputs.name!.value,
								email: formState.inputs.email.value,
								password: formState.inputs.password.value,
								birthDate: formState.inputs.birthDate.value,
							}),
						}
					);
					data = await res.json();
				}

				if (res != undefined && !res.ok) {
					throw new Error(data.message);
				}

				console.log(data);
				setIsLoading((prevMode) => prevMode);
				auth.login();
			} catch (err) {
				let message = 'Something went wrong.';

				if (err instanceof Error) {
					message = err.message;
				}
				setIsLoading((prevMode) => prevMode);
				setError(message);
				console.log(err);
			}
		}
	};

	const errorHandler = () => {
		setError(null);
	};

	return (
		<>
			<ErrorModal error={error} onClear={errorHandler} />
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
