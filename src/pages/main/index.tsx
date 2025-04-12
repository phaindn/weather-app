import React, { useMemo } from 'react';

const Main = () => {
  const env: 'development' | 'production' = useMemo(() => {
    return import.meta.env.VITE_TEST || process.env.NODE_ENV === 'test' ? 'development' : 'production';
  }, []);

  return (
    <>
      <h2 className="test">Hello Vite + React!</h2>
      <p className="env">{env}</p>
    </>
  );
};

export default Main;
