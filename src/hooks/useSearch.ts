import { useState, useEffect } from 'react';

export const useSearch = (initialState: string) => {
  const [value, setValue] = useState(initialState);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setValue(value);
  };

  const fetch = () => {
    console.log(value);
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => fetch(), 500);
    return () => clearTimeout(timeOutId);
  }, [value]);

  return { fetch, onChange };
};
