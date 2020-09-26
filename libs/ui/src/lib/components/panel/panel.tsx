import React, { FunctionComponent } from 'react';

import './panel.scss';

export interface PanelProps {
  title: string;
}

export const Panel: FunctionComponent<PanelProps> = ({ title, children }) => {
  return (
    <nav className="panel">
      <p className="panel-heading">{title}</p>
      <div className="panel-block">{children}</div>
    </nav>
  );
};

export default Panel;
