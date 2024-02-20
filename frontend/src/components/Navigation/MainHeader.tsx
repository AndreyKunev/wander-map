import { ReactNode, FC } from 'react';

import './MainHeader.css';

const MainHeader: FC<{ children: ReactNode }> = ({ children }) => {
  return <header className="main-header">{children}</header>;
};

export default MainHeader;
