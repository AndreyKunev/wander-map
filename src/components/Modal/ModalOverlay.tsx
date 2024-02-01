import ReactDOM from 'react-dom';

const ModalOverlay = (props) => {
  const targetElement = document.getElementById('modal-hook');

  if (!targetElement) {
    console.error("Element with ID 'modal-hook' not found in the DOM.");
    return null;
  }

  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal_content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal_footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );

  return ReactDOM.createPortal(content, targetElement);
};

export default ModalOverlay;
