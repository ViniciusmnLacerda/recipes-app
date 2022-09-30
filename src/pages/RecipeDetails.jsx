import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DrinkDetails from '../components/DrinkDetails';
import GoBack from '../components/GoBack';
import Header from '../components/Header';
import MealDetails from '../components/MealDetails';
import RecommendedRecipes from '../components/RecommendedRecipes';
import {
  drinkDetailToRender,
  drinksToRecommend,
  inProgressAction,
  mealDetailToRender,
  mealsToRecommend
} from '../redux/actions';
import { fetchDrinks, fetchMeals, fetchRecipeDetails } from '../services/fetchAPI';
import '../styles/RecipeDetails.css';

function RecipeDetails() {
  const history = useHistory();
  const path = history.location.pathname.split('/');
  const dispatch = useDispatch();

  const fetchRecipe = async () => {
    const maxRecipesToRecommend = 6;
    if (path[1] === 'meals') {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${path[2]}`;
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const data = await fetchRecipeDetails(endpoint);
      const { drinks } = await fetchDrinks(url);
      const setDrinks = drinks.filter((_, index) => index < maxRecipesToRecommend);
      dispatch(mealDetailToRender(data.meals));
      dispatch(drinksToRecommend(setDrinks));
    } else {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${path[2]}`;
      const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const { meals } = await fetchMeals(url);
      const setMeals = meals.filter((_, index) => index < maxRecipesToRecommend);
      const data = await fetchRecipeDetails(endpoint);
      dispatch(drinkDetailToRender(data.drinks));
      dispatch(mealsToRecommend(setMeals));
    }
  };

  const finishedRecipe = () => {
    const recoveredDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (recoveredDoneRecipes !== null) {
      return recoveredDoneRecipes.some((element) => element.id === path[2]);
    } return false;
  };

  const continueRecipe = () => {
    let assistant = false;
    const recovered = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recovered !== null) {
      Object.entries(recovered).forEach((element) => {
        if (element[0] === path[1]) {
          assistant = Object.keys(element[1]).some((id) => id === path[2]);
        }
      });
    }
    return assistant;
  };

  useEffect(() => {
    dispatch(inProgressAction(false));
    fetchRecipe();
  }, []);

  return (
    <main>
      <Header pageTitle="Recipe Details" searchVisible={false} />
      {path[1] === 'meals' ? (
        <>
          <GoBack />
          <MealDetails />
          <RecommendedRecipes />
        </>
      ) : (
        <>
          <GoBack />
          <DrinkDetails />
          <RecommendedRecipes />
        </>
      )}
      {!finishedRecipe() && (
        <button
          data-testid="start-recipe-btn"
          type="button"
          className="start-btn"
          onClick={() => history.push(`/${path[1]}/${path[2]}/in-progress`)}
        >
          {continueRecipe() ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
    </main>
  );
}

export default RecipeDetails;
