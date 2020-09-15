import React, { FunctionComponent } from 'react';
import PageIndicator from '../page-indicator/page-indicator';
import './page-indicators.scss';

export interface PageIndicatorssProps {
  length: number;
  currentPage: number;
  onClick: (i: number) => void;
}

const PageIndicators: FunctionComponent<PageIndicatorssProps> = ({
  length,
  currentPage,
  onClick,
}) => {
  return (
    <div className="page-indicators">
      {Array.from(Array(length).keys()).map((i) => (
        <PageIndicator
          key={i}
          onClick={() => onClick(i)}
          isActive={i === currentPage}
        />
      ))}
    </div>
  );
};

export default PageIndicators;
