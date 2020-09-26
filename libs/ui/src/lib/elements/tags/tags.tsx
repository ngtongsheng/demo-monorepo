import React, { FunctionComponent } from 'react';

import './tags.scss';

export const Tags: FunctionComponent = ({ children }) => {
  return <div className="tags">{children}</div>;
};

export default Tags;
