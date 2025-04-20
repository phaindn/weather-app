import React from 'react';
import { RouteObject } from 'react-router-dom';
import Layout from '@/pages/layout';
import NotFound from '@/pages/NotFound';
import Search from '@/pages/location';
import HomePage from '@/pages/home';

export default [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'search',
        element: <Search />
      }
    ],
  },
  {
    path: '/*',
    element: <NotFound />,
  },
] as RouteObject[];
