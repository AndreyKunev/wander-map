import { ReactNode,FC } from 'react';
import ReactDOM from 'react-dom';

import './SideDrawer.css';

const SideDrawer: FC<{ children: ReactNode }> = ({children}) => {
  const targetElement = document.getElementById('drawer-hook');

  if (!targetElement) {
    console.error("Element with ID 'drawer-hook' not found in the DOM.");
    return null;
  }

  const content = <aside className='side-drawer'>{children}</aside>;

  return ReactDOM.createPortal(content, targetElement);
};

export default SideDrawer;
