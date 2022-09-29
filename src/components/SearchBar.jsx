import React, { useState } from 'react';
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { drinksToRenderAction, mealsToRenderAction } from '../redux/actions';
import { fetchDrinks, fetchMeals } from '../services/fetchAPI';
import '../styles/SearchBar.css';

function SearchBar() {
  const user = useSelector((state) => state.user);
  const [searchFilter, setSearchFilter] = useState({ search: '', radio: '' });
  const dispatch = useDispatch();
  const history = useHistory();
  const path = history.location.pathname;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setSearchFilter({ ...searchFilter, [name]: value });
  };

  const returnEndPoint = () => {
    const { search, radio } = searchFilter;
    if (path.includes('meals')) {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/${radio === 'i' ? 'filter' : 'search'}.php?${radio}=${search}`;
      return endpoint;
    }
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/${radio === 'i' ? 'filter' : 'search'}.php?${radio}=${search}`;
    return endpoint;
  };

  const DoHaveToRedirect = (toCompare, pathName, id) => {
    if (toCompare.length === 1) {
      history.push(`/${pathName}/${toCompare[0][id]}`);
    }
  };

  const handleClick = async () => {
    const maxRecipesToRender = 12;
    const { search, radio } = searchFilter;
    const endpoint = returnEndPoint();
    if (radio === 'f' && search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else if (path.includes('meals')) {
      const data = await fetchMeals(endpoint);
      if (data.meals.length > 0) {
        const setMeals = data.meals.filter((_, index) => index < maxRecipesToRender);
        dispatch(mealsToRenderAction(setMeals));
        DoHaveToRedirect(setMeals, 'meals', 'idMeal');
      } else {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    } else {
      const data = await fetchDrinks(endpoint);
      if (data.drinks.length > 0) {
        const setDrinks = data.drinks.filter((_, index) => index < maxRecipesToRender);
        dispatch(drinksToRenderAction(setDrinks));
        DoHaveToRedirect(setDrinks, 'drinks', 'idDrink');
      } else {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    }
  };

  return (
    <>
      {user.isSearchVisible && (
        <section className="searchbar-container">
          <form>
            <div className="input-searchbar">
              <label htmlFor="search">
                <AiOutlineSearch fontSize={ 22 } />
                <input
                  placeholder="Search"
                  data-testid="search-input"
                  name="search"
                  id="search"
                  value={ searchFilter.search }
                  onChange={ handleChange }
                  type="text"
                />
              </label>
            </div>
            <div className="radio-searchbar">
              <label htmlFor="ingredientRadio">
                <input
                  data-testid="ingredient-search-radio"
                  type="radio"
                  checked={ searchFilter.radio === 'i' }
                  value="i"
                  id="ingredientRadio"
                  name="radio"
                  onChange={ handleChange }
                />
                Ingredient
              </label>
              <label htmlFor="searchRadio">
                <input
                  type="radio"
                  checked={ searchFilter.radio === 's' }
                  value="s"
                  id="searchRadio"
                  name="radio"
                  data-testid="name-search-radio"
                  onChange={ handleChange }
                />
                Name
              </label>
              <label htmlFor="firstLetterRadio">
                <input
                  type="radio"
                  checked={ searchFilter.radio === 'f' }
                  value="f"
                  name="radio"
                  id="firstLetterRadio"
                  data-testid="first-letter-search-radio"
                  onChange={ handleChange }
                />
                First letter
              </label>
            </div>
            <button
              data-testid="exec-search-btn"
              type="button"
              onClick={ handleClick }
              className="search-btn"
            >
              Search
            </button>
          </form>
        </section>
      )}
    </>
  );
}

export default SearchBar;
