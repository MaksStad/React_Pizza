import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';


import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';


const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);

  const { searchValue } = useContext(SearchContext)
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  useEffect(() => {
    setIsLoading(true)

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = `&sortBy=${sort.sortProperty}&order=-desc`;
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(`https://663778c1288fedf693806759.mockapi.io/items?page=${currentPage}&limit=4&${category}${sortBy}${search}`)
      .then((arr) => {
        setItems(arr.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const sceleton = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  const pizzas = items.map((obj) => (<PizzaBlock key={obj.id} {...obj} />));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? sceleton : pizzas}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}

export default Home;
