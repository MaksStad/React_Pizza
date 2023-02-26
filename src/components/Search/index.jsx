import React, { useCallback, useContext, useRef, useState } from 'react'
import debounce from 'lodash.debounce';
import { SearchContext } from '../../App';

import styles from './Search.module.scss'

const Search = () => {
  const [value, setValue] = useState('');
  const { setSearchValue } = useContext(SearchContext)
  const inputRef = useRef();

  const onClickCleat = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearchValue = useCallback(
    debounce((str) => {
      console.log(str);
      setSearchValue(str);
    }, 500),
    [],
  )

  const onChangeInput = event => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  }

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M18,10a8,8,0,1,0-3.1,6.31l6.4,6.4,1.41-1.41-6.4-6.4A8,8,0,0,0,18,10Zm-8,6a6,6,0,1,1,6-6A6,6,0,0,1,10,16Z" />
      </svg>
      {value && <svg
        onClick={onClickCleat}
        className={styles.close}
        height="48"
        viewBox="0 0 48 48"
        width="48"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
        <path d="M0 0h48v48h-48z" fill="none" />
      </svg>}
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input} placeholder="Поиск пиццы ..." />
    </div >
  );
}

export default Search