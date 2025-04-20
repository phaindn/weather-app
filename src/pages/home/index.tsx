import { useLocationSearch } from '@/hooks/useLocationSearch';
import React, { useMemo, useState } from 'react';

const HomePage = () => {
  const searchParams = useLocationSearch();
  const [query, setQuery] = useState(searchParams.q || '');

  return (
    <>
      <header>Weather</header>
      <main></main>
      <footer>
        <p>
          Learn more about <a href="#">weather data</a> and <a href="#">map data</a>
        </p>
      </footer>
    </>
  );
};

export default HomePage;
