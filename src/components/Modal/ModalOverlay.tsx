import ReactDOM from 'react-dom';
import { FC } from 'react';

import { ModalProps } from '../../types/types';

const ModalOverlay: FC<ModalProps> = ({
  className,
  style,
  headerClass,
  header,
  onSubmit,
  contentClass,
  children,
  footerClass,
  footer
}) => {
  const targetElement = document.getElementById('modal-hook');

  if (!targetElement) {
    console.error("Element with ID 'modal-hook' not found in the DOM.");
    return null;
  }

  const content = (
    <div className={`modal ${className}`} style={style}>
      <header className={`modal__header ${headerClass}`}>
        <h2>{header}</h2>
      </header>
      <form
        onSubmit={
          onSubmit ? onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal__content ${contentClass}`}>
          {children}
        </div>
        <footer className={`modal__footer ${footerClass}`}>
          {footer}
        </footer>
      </form>
    </div>
  );

  return ReactDOM.createPortal(content, targetElement);
};

export default ModalOverlay;
