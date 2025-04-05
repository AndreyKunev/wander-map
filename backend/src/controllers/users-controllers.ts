import { Request, Response, NextFunction } from 'express';

import { HttpError } from '../models/http-error';
import { User } from '../models/user';

let DUMMY_USERS = [
	{
		id: 'u1',
		name: 'Peter',
		email: 'test@test.com',
		bio: 'This is a test bio',
		profilePicture: 'an image',
		birthDate: '03/03/1990',
		password: 'test',
	},
	{
		id: 'u2',
		name: 'Steve',
		email: 'test2@test.com',
		bio: 'This is another test bio',
		profilePicture: 'another image',
		birthDate: '03/04/1990',
		password: 'test',
	},
	{
		id: 'u3',
		name: 'Jenny',
		email: 'test3@test.com',
		bio: 'This is the third test bio',
		profilePicture: 'third image',
		birthDate: '03/05/1990',
		password: 'test',
	},
];

export const getAllUsers = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let users;

	try {
		users = await User.find({}, '-password').exec();
	} catch (err) {
		return next(new HttpError('Failed to get users.', 500));
	}
	res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

export const getUserById = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userId = req.params.userId;

	const user = DUMMY_USERS.find((user) => {
		return user.id === userId;
	});

	if (!user) {
		return next(new HttpError('No user found for provided id', 404));
	}

	res.json({ user });
};

export const loginUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email, password } = req.body;

	let existingUser;

	try {
		existingUser = await User.findOne({ email: email }).exec();
	} catch (err) {
		return next(new HttpError('Logging in failed.', 500));
	}

	if (!existingUser || existingUser.password !== password) {
		return next(new HttpError('Invalid credentials!', 401));
	}

	res.json({ message: 'Login successful.' });
};

export const createUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { name, birthDate, email, password, places } = req.body;

	try {
		const hasUser = await User.findOne({ email: email }).exec();
		if (hasUser) {
			return next(new HttpError('Email already in use.', 409));
		}
	} catch (err) {
		return next(
			new HttpError('Error occurred during email validation.', 500)
		);
	}

	const createdUser = new User({
		name,
		birthDate,
		password,
		email,
		places,
		bio: '',
		profilePicture: 'test',
	});

	try {
		await createdUser.save();
		res.status(201).json({
			message: `User "${name}" created!`,
			user: createdUser.toObject({ getters: true }),
		});
	} catch (err) {
		if (err.code === 11000) {
			return next(new HttpError('Email already in use.', 409));
		}
		return next(new HttpError('Could not create user.' + err.message, 500));
	}
};

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
	const userId = req.params.userId;

	const targetIndex = DUMMY_USERS.findIndex((user) => user.id === userId);

	if (targetIndex === -1) {
		return next(new HttpError('No user found for provided id.', 404));
	}

	DUMMY_USERS = DUMMY_USERS.filter((user) => user.id !== userId);

	res.status(200).json({ message: 'User deleted' });
};
