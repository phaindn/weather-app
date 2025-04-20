import React from 'react';
import { Outlet } from 'react-router-dom';
import s from './Layout.module.scss';

const Layout = () => {
  return (
    <Outlet />
  );
};

export default Layout;
