import React, { memo, useMemo, useState } from 'react';
import s from './Search.module.scss';
import { useLocationSearch } from '@/hooks/useLocationSearch';
import cx from 'classnames';

type Props = {
  item: OpenWeather.Location;
}
export const LocationCard = memo((props: Props) => {
  const { item } = props;

  return (
    <div className={cx(s.wrapper)}>
      <div className={cx(s.flag)}>
        <img src={`https://flagsapi.com/${item.country}/flat/64.png`} />
      </div>
      <div className={cx(s.info)}>
        <h5>{item.name}</h5>
        <p>{item.state}</p>
      </div>
    </div>
  );
});

