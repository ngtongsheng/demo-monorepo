import { clamp } from 'ramda';
import { useState, useCallback } from 'react';

const useIndex = (
  initialIndex = 0,
  max = 3,
  min = 0
): [
  number,
  (index: number) => void,
  (step?: number) => void,
  (step?: number) => void
] => {
  const [index, setIndex] = useState<number>(initialIndex);
  const maxNum = max;
  const minNum = min;

  const calculate = useCallback((step) => clamp(minNum, maxNum, index + step), [
    index,
    maxNum,
    minNum,
  ]);

  const decrease = useCallback(
    (step = 1) => {
      setIndex(calculate(-step));
    },
    [calculate]
  );

  const increase = useCallback(
    (step = 1) => {
      setIndex(calculate(step));
    },
    [calculate]
  );

  return [index, setIndex, decrease, increase];
};

export default useIndex;
