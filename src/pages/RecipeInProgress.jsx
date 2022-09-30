import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DrinkDetails from '../components/DrinkDetails';
import GoBack from '../components/GoBack';
import Header from '../components/Header';
import MealDetails from '../components/MealDetails';
import {
  drinkDetailToRender, inProgressAction, loadingAction, mealDetailToRender
} from '../redux/actions';
import { fetchRecipeDetails } from '../services/fetchAPI';
import '../styles/RecipeInProgress.css';

function InProgress() {
  const history = useHistory();
  const path = history.location.pathname.split('/');
  const dispatch = useDispatch();
  const { checkboxes } = useSelector((state) => state.user);
  const { drinkDetails } = useSelector((state) => state.drinks);
  const { mealDetails } = useSelector((state) => state.meals);

  const fetchRecipe = async () => {
    dispatch(loadingAction(true));
    if (path[1] === 'meals') {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${path[2]}`;
      const data = await fetchRecipeDetails(endpoint);
      dispatch(mealDetailToRender(data.meals));
      dispatch(loadingAction(false));
    } else {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${path[2]}`;
      const data = await fetchRecipeDetails(endpoint);
      dispatch(drinkDetailToRender(data.drinks));
      dispatch(loadingAction(false));
    }
  };

  const isDisabled = () => {
    if (Object.keys(checkboxes).length === 0) {
      return true;
    }
    const btnIsDisabled = Object.values(checkboxes).some((element) => element === false);
    return btnIsDisabled;
  };

  const setDoneRecipeObj = (path) => {
    const objDoneRecipe = {
      id: path === 'meals' ? (mealDetails[0].idMeal) : (drinkDetails[0].idDrink),
      type: path === 'meals' ? ('meal') : ('drink'),
      nationality: path === 'meals' ? (mealDetails[0].strArea) : (''),
      category: path === 'meals' ? (mealDetails[0].strCategory) : (''),
      alcoholicOrNot: path === 'meals' ? ('') : (drinkDetails[0].strAlcoholic),
      name: path === 'meals' ? (mealDetails[0].strMeal) : (drinkDetails[0].strDrink),
      image: path === 'meals' ? (mealDetails[0].strMealThumb) : (drinkDetails[0].strDrinkThumb),
      doneDate: new Date(Date.now()).toLocaleDateString(),
      // eslint-disable-next-line no-nested-ternary
      tags: path === 'meals' ? ((mealDetails[0].strTags !== null) ? ([...mealDetails[0].strTags.split(',')]) : ([])) : ([]),
    };
    return objDoneRecipe;
  };

  const finishRecipe = () => {
    let recovered = JSON.parse(localStorage.getItem('doneRecipes'));
    if (path[1] === 'meals') {
      if (recovered !== null && Object.keys(recovered).length > 0) {
        recovered = [...recovered, setDoneRecipeObj('meals')];
        localStorage.setItem('doneRecipes', JSON.stringify(recovered));
      } else localStorage.setItem('doneRecipes', JSON.stringify([setDoneRecipeObj('meals')]));
    } else if (recovered !== null && Object.keys(recovered).length > 0) {
      recovered = [...recovered, setDoneRecipeObj('drinks')];
      localStorage.setItem('doneRecipes', JSON.stringify(recovered));
    } else localStorage.setItem('doneRecipes', JSON.stringify([setDoneRecipeObj('drinks')]));
    history.push('/done-recipes');
  };

  useEffect(() => {
    dispatch(inProgressAction(true));
    fetchRecipe();
  }, []);

  return (
    <main>
      <Header pageTitle="Recipe in Progress" searchVisible={false} />
      {path.includes('meals') ? (
        <>
          <GoBack />
          <MealDetails />
        </>
      ) : (
        <>
          <GoBack />
          <DrinkDetails />
        </>
      )}
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={isDisabled()}
        onClick={finishRecipe}
      >
        Finalizar Receita
      </button>
    </main>
  );
}

export default InProgress;
