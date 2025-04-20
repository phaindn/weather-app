import React from 'react';
import { RouteObject } from 'react-router-dom';
import Layout from '@/pages/layout';
import Main from '@/pages/main';
import NotFound from '@/pages/NotFound';
import Search from '@/pages/search';

export default [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Main />
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
