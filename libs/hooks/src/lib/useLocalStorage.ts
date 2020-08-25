import { useState, useCallback } from 'react';

const useLocalStorage = (key: string, initialValue) => {
  const getItem = useCallback(() => {
    try {
      const item = window.localStorage.getItem(key);

      if (item) {
        return JSON.parse(item);
      }

      return initialValue;
    } catch (error) {
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setValue] = useState(getItem);

  const setItem = useCallback(
    (value) => {
      try {
        setValue(value);
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        throw new Error(error);
      }
    },
    [key]
  );

  return [storedValue, setItem, getItem];
};

export default useLocalStorage;
