import React, { useMemo, useState } from 'react';
import s from './Search.module.scss';
import { useLocationSearch } from '@/hooks/useLocationSearch';

const Search = () => {

  const searchParams = useLocationSearch();
  const query = useState(searchParams.query || '');


  return (
    <>
    {query}
    </>
  );
};

export default Search;
