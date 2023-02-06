import React, { useState, useEffect } from 'react'

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";


export default function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setsortType] = useState({ name: 'популярности', sortProperty: 'rating' });

  useEffect(() => {
    setIsLoading(true)
    fetch(
      `https://63cd5c94d4d47898e397781a.mockapi.io/items?${categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortType.sortProperty}&order=asc`
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  console.log('categoryId', categoryId, sortType)

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(i) => setCategoryId(i)} />
        <Sort value={sortType} onChangeSort={(i) => setsortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : items.map((obj) => (<PizzaBlock key={obj.id} {...obj} />
          ))}
      </div>
    </div>
  )
}
