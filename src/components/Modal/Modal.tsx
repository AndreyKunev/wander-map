import { CSSTransition } from 'react-transition-group';

import Backdrop from '../Backdrop/Backdrop';
import ModalOverlay from './ModalOverlay';

import './Modal.css';

const Modal = (props) => {
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props}/>
      </CSSTransition>
    </>
  );
};

export default Modal;
