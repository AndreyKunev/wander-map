import React, { CSSProperties, ReactNode } from 'react';

import './Card.css';

const Card: React.FC<{
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}> = ({ className, style, children }) => {
  return (
    <div className={`card ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Card;
