import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  drinksToRenderAction,
  mealsToRenderAction,
  setCategoriesDrinks,
  setCategoriesMeals,
} from '../redux/actions';
import {
  fetchCategory,
  fetchDrinks,
  fetchDrinksCategories,
  fetchMeals,
  fetchMealsCategories,
} from '../services/fetchAPI';

function CategoriesButtons() {
  const dispatch = useDispatch();
  const history = useHistory();
  const path = history.location.pathname;
  const meals = useSelector((state) => state.meals);
  const drinks = useSelector((state) => state.drinks);
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchDefaultRecipes = async () => {
    if (path.includes('meals')) {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const data = await fetchMeals(endpoint);
      console.log(data);
      const maxRecipesToRender = 12;
      const setMeals = data.meals.filter(
        (_, index) => index < maxRecipesToRender,
      );
      dispatch(mealsToRenderAction(setMeals));
    } else {
      const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const data = await fetchDrinks(endpoint);
      const maxRecipesToRender = 12;
      const setDrinks = data.drinks.filter(
        (_, index) => index < maxRecipesToRender,
      );
      dispatch(drinksToRenderAction(setDrinks));
    }
  };

  const fetchCategories = async () => {
    const maxCategoriesToRender = 5;
    if (path.includes('meals')) {
      const data = await fetchMealsCategories();
      const setCategories = data.filter(
        (_, index) => index < maxCategoriesToRender,
      );
      dispatch(setCategoriesMeals(setCategories));
    } else {
      const data = await fetchDrinksCategories();
      const setCategories = data.filter(
        (_, index) => index < maxCategoriesToRender,
      );
      dispatch(setCategoriesDrinks(setCategories));
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const requestCategory = async (category) => {
    const maxRecipesToRender = 12;
    if (selectedCategory === category) {
      fetchDefaultRecipes();
    } else if (path.includes('meals')) {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
      const mealsCategory = await fetchCategory(endpoint, 'meals');
      const setMeals = mealsCategory.filter(
        (_, index) => index < maxRecipesToRender,
      );
      dispatch(mealsToRenderAction(setMeals));
    } else {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
      const drinksCategory = await fetchCategory(endpoint, 'drinks');
      const setDrinks = drinksCategory.filter(
        (_, index) => index < maxRecipesToRender,
      );
      dispatch(drinksToRenderAction(setDrinks));
    }
    setSelectedCategory(category);
  };

  const allRecipes = async () => {
    const maxRecipesToRender = 12;
    if (path.includes('meals')) {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const data = await fetchMeals(endpoint);
      const setMeals = data.meals.filter(
        (_, index) => index < maxRecipesToRender,
      );
      dispatch(mealsToRenderAction(setMeals));
    } else {
      const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const data = await fetchDrinks(endpoint);
      const setDrinks = data.drinks.filter(
        (_, index) => index < maxRecipesToRender,
      );
      dispatch(drinksToRenderAction(setDrinks));
    }
  };

  return (
    <section>
      <main>
        {(path.includes('meals') ? meals : drinks).categories.map(
          ({ strCategory }) => (
            <button
              key={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
              type="button"
              onClick={ () => requestCategory(strCategory) }
            >
              {strCategory}
            </button>
          ),
        )}
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ allRecipes }
        >
          All
        </button>
      </main>
    </section>
  );
}

export default CategoriesButtons;
