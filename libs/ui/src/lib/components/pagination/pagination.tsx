import React, {
  useCallback,
  useEffect,
  useState,
  FunctionComponent,
} from 'react';
import classNames from 'classnames';
import { clamp } from 'ramda';

import { useIndex } from '@demo-monorepo/hooks';
import PaginationLink from './pagination-link';
import './pagination.scss';
import FaIcon from '../../elements/fa-icon/fa-icon';

export interface PaginationProps {
  initialIndex?: number;
  total: number;
  size: number;
  onChange: (n: number) => void;
}

const first = 1;
const displayTotal = 6;
const threshold = displayTotal - 2;

const generateSequences = (initialValue, count) => {
  return Array(count)
    .fill(initialValue)
    .map((item, i) => item + i);
};

export const Pagination: FunctionComponent<PaginationProps> = ({
  initialIndex = 0,
  total,
  size,
  onChange,
}) => {
  const classes = classNames('cd', 'pagination', 'is-rounded');

  const minTotal = Math.max(total, 0);
  const minSize = Math.max(size, 1);
  const last = Math.ceil(minTotal / minSize);
  const lastIndex = last - 1;
  const allowedInitialIndex = clamp(0, lastIndex, initialIndex);
  const hook = useIndex(allowedInitialIndex, lastIndex);
  const [index, setIndex, decrease, increase] = hook;

  const currentPage = index + 1;
  const isFirst = index === 0;
  const isLast = index === lastIndex;
  const isWithinDisplayTotal = lastIndex >= displayTotal;

  const isBeyondLeftThreshold = currentPage >= first + threshold;
  const isBeyondRightThreshold = currentPage <= last - threshold;
  const isLeftEllipsis = isBeyondLeftThreshold && isWithinDisplayTotal;
  const isRightEllipsis = isBeyondRightThreshold && isWithinDisplayTotal;

  const [pages, setRanges] = useState([]);

  useEffect(() => {
    if (isRightEllipsis && isLeftEllipsis) {
      setRanges(generateSequences(index, threshold - 1));
      return;
    }

    if (isRightEllipsis) {
      setRanges(generateSequences(first + 1, threshold));
      return;
    }

    if (isLeftEllipsis) {
      setRanges(generateSequences(last - threshold, threshold));
      return;
    }

    setRanges(generateSequences(first + 1, Math.max(last - 2, 0)));
  }, [index, isLeftEllipsis, isRightEllipsis, last, lastIndex]);

  useEffect(() => {
    if (!onChange) {
      return;
    }

    onChange(index);
  }, [index, onChange]);

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex, setIndex]);

  const handlePageChange = useCallback(
    (page) => {
      setIndex(page - 1);
    },
    [setIndex]
  );

  const handlePrevious = useCallback(() => {
    decrease();
  }, [decrease]);

  const handleNext = useCallback(() => {
    increase();
  }, [increase]);

  return (
    <div>
      {last > first && (
        <nav className={classes} role="navigation" aria-label="pagination">
          <ul className="cd pagination-list">
            <li>
              <button
                className="pagination-previous"
                disabled={isFirst}
                onClick={handlePrevious}
              >
                <FaIcon name="chevron-left" />
              </button>
            </li>

            <PaginationLink isCurrent={isFirst} onClick={() => setIndex(0)}>
              {first}
            </PaginationLink>

            {isLeftEllipsis && (
              <li>
                <span className="cd pagination-ellipsis">&hellip;</span>
              </li>
            )}

            {pages.map((page) => (
              <PaginationLink
                key={page}
                onClick={() => handlePageChange(page)}
                isCurrent={currentPage === page}
              >
                {page}
              </PaginationLink>
            ))}

            {isRightEllipsis && (
              <li>
                <span className="cd pagination-ellipsis">&hellip;</span>
              </li>
            )}

            <PaginationLink
              isCurrent={isLast}
              onClick={() => setIndex(lastIndex)}
            >
              {last}
            </PaginationLink>

            <li>
              <button
                className="pagination-next"
                disabled={isLast}
                onClick={handleNext}
              >
                <FaIcon name="chevron-right" />
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};
