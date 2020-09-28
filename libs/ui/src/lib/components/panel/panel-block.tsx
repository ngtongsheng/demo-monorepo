import React, { FunctionComponent } from 'react';
import './panel.scss';

export const PanelBlock: FunctionComponent = ({ children }) => {
  return <div className="panel-block">{children}</div>;
};

export default PanelBlock;
