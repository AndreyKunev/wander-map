import { FormEvent, useState, useContext, FC } from 'react';

import Card from '../../components/Card/Card';
import Input from '../../components/FormElements/Input/Input';
import Button from '../../components/FormElements/Button/Button';
import {
	VALIDATOR_EMAIL,
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from '../../utils/validators';
import { useForm } from '../../hooks/form-hook';
import { AuthContext } from '../../context/auth-context';

import './AuthPage.css';

const AuthPage: FC = () => {
	const auth = useContext(AuthContext);
	const [isLogin, setIsLogin] = useState(true);

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
							}),
						}
					);
				}

				const data = await res!.json();
				console.log(data);
			} catch (err) {
				console.log(err);
			}
		}

		auth.login();
	};

	return (
		<Card className='authentication'>
			<form className='authentication' onSubmit={loginHandler}>
				<div className='authentication__header'>
					<h2>{isLogin ? 'Welcome back!' : 'Create Account'}</h2>
				</div>
				{!isLogin && (
					<Input
						id='name'
						type='text'
						label='Name'
						element='input'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid name.'
						onInput={inputHandler}
					/>
				)}
				<Input
					id='email'
					type='text'
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
	);
};

export default AuthPage;
