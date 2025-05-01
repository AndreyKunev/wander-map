import { ValidatorType } from '../types/types';

const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_FILE = 'FILE';
const VALIDATOR_TYPE_DATE = 'DATE';

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = (val: number) => ({
	type: VALIDATOR_TYPE_MINLENGTH,
	val,
});
export const VALIDATOR_MAXLENGTH = (val: number) => ({
	type: VALIDATOR_TYPE_MAXLENGTH,
	val,
});
export const VALIDATOR_MIN = (val: number) => ({
	type: VALIDATOR_TYPE_MIN,
	val,
});
export const VALIDATOR_MAX = (val: number) => ({
	type: VALIDATOR_TYPE_MAX,
	val,
});
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });
export const VALIDATOR_DATE = () => ({ type: VALIDATOR_TYPE_DATE });

const isValidPastDate = (value: string): boolean => {
	if (!value) return false;

	const date = new Date(value);
	if (isNaN(date.getTime())) return false;

	const today = new Date();
	today.setHours(0, 0, 0, 0);
	date.setHours(0, 0, 0, 0);

	return date <= today;
};

export const validate = (
	value: string,
	validators: ValidatorType[]
): boolean => {
	for (const validator of validators) {
		switch (validator.type) {
			case VALIDATOR_TYPE_REQUIRE:
				if (value.trim().length === 0) return false;
				break;

			case VALIDATOR_TYPE_MINLENGTH:
				if (value.trim().length < validator.val!) return false;
				break;

			case VALIDATOR_TYPE_MAXLENGTH:
				if (value.trim().length > validator.val!) return false;
				break;

			case VALIDATOR_TYPE_MIN: {
				const minNum = Number(value);
				if (isNaN(minNum) || minNum < validator.val!) return false;
				break;
			}

			case VALIDATOR_TYPE_MAX: {
				const maxNum = Number(value);
				if (isNaN(maxNum) || maxNum > validator.val!) return false;
				break;
			}

			case VALIDATOR_TYPE_EMAIL: {
				const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailPattern.test(value)) return false;
				break;
			}

			case VALIDATOR_TYPE_DATE:
				if (!isValidPastDate(value)) return false;
				break;
		}
	}

	return true;
};
