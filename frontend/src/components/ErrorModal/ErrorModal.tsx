import { FC } from 'react';

import Modal from '../Modal/Modal';
import Button from '../FormElements/Button/Button';

import { ErrorModalProps } from '../../types/types';

const ErrorModal: FC<ErrorModalProps> = ({ error, onClear }) => {
	return (
		<Modal
			show={!!error}
			onCancel={onClear}
			header='An error occurred!'
			footer={<Button onClick={onClear}>OK</Button>}
		>
			<p>{error}</p>
		</Modal>
	);
};

export default ErrorModal;
