import { Request, Response, NextFunction } from 'express';

import { HttpError } from '../models/http-error';
import { User } from '../models/user';

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

export const getUserById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userId = req.params.userId;

	let targetUser;

	try {
		targetUser = await User.findById(userId).exec();
	} catch (err) {
		return next(new HttpError('Could not find user.', 500));
	}

	if (!targetUser) {
		return next(new HttpError('No user found for provided id', 404));
	}

	res.json({ user: targetUser.toObject({ getters: true }) });
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
