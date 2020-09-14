import { useEffect } from 'react';

const useKeyDown = (target, callback, isPreventDefault = false) => {
  useEffect(() => {
    const handleKeydown = (event) => {
      const { key } = event;

      if (Array.isArray(target) && target.indexOf(key) === -1) {
        return;
      }

      if (!Array.isArray(target) && key !== target) {
        return;
      }

      callback(event);

      if (!isPreventDefault) {
        return;
      }

      event.preventDefault();
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [callback, isPreventDefault, target]);
};

export default useKeyDown;
