import React, { useMemo, useState } from 'react';
import s from './Search.module.scss';
import { useLocationSearch } from '@/hooks/useLocationSearch';

const LocationPage = () => {

  const searchParams = useLocationSearch();
  const [query, setQuery] = useState(searchParams.q || '');

  return (
    <div>
      <input defaultValue={query} onInput={(e: any) => setQuery(e.target.value)} />
      <p>{query}</p>
    </div>
  );
};

export default LocationPage;
