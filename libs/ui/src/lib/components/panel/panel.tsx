import React, { FunctionComponent } from 'react';
import PanelBlock from './panel-block';

import './panel.scss';

export interface PanelProps {
  title: string;
  isPanelBlock?: boolean;
}

export const Panel: FunctionComponent<PanelProps> = ({
  title,
  children,
  isPanelBlock = true,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">{title}</p>
      {isPanelBlock && <PanelBlock>{children}</PanelBlock>}
      {!isPanelBlock && children}
    </nav>
  );
};

export default Panel;
