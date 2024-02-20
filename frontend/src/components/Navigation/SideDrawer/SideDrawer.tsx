import React, { ReactNode, FC, useRef, useEffect, ReactEventHandler } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './SideDrawer.css';

const SideDrawer: FC<{ children: ReactNode; show: boolean,onClick: ReactEventHandler }> = ({
  children,
  show,
  onClick
}) => {
  const targetElement = document.getElementById('drawer-hook');
  const nodeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    nodeRef.current = nodeRef.current || null;
  },[show])

  if (!targetElement) {
    console.error("Element with ID 'drawer-hook' not found in the DOM.");
    return null;
  }

  const content = (
    <CSSTransition
      in={show}
      timeout={200}
      classNames={{
        enterActive: 'slide-in-left-enter',
        enterDone: 'slide-in-left-enter-active',
        exitActive: 'slide-in-left-exit',
        exit: 'slide-in-left-exit-active',
      }}
      mountOnEnter
      unmountOnExit
      nodeRef={nodeRef}
    >
      <aside ref={nodeRef} className="side-drawer" onClick={onClick}>{children}</aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(content, targetElement);
};

export default SideDrawer;
