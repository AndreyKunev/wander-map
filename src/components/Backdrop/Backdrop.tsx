import ReactDOM from 'react-dom';
import { FC, ReactEventHandler } from 'react';

import './Backdrop.css';

const Backdrop: FC<{ onClick: ReactEventHandler }> = ({onClick}) => {
  const targetElement = document.getElementById('backdrop-hook');

  if (!targetElement) {
    console.error("Element with ID 'backdrop-hook' not found in the DOM.");
    return null;
  }

  return ReactDOM.createPortal(
    <div className='backdrop' onClick={onClick}></div>,
    targetElement
    );
}

export default Backdrop;