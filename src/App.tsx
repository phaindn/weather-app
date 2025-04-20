import React, { memo, useEffect } from 'react';
import routes from '@/routes/index';
import { useRoutes } from 'react-router-dom';
import { getCurrentPosition } from './utils/geo';
import { useLocationStore } from './store';
import { toast, ToastContainer } from 'react-toastify';

const App = memo(() => {
  const element = useRoutes(routes);
  const currentLocation = useLocationStore(state => state.current);
  const setLocation = useLocationStore(state => state.setCurrent);

  useEffect(() => {
    console.log('App mounted')
    if (currentLocation) return;
    getCurrentPosition().then(res => {
      setLocation(res);
    }).catch(err => {
      toast(err.message, { type: 'error' });
    });
  }, []);

  return <>
    {element}
    <ToastContainer
      position='bottom-right'
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
    />
  </>;
});

export default App;
