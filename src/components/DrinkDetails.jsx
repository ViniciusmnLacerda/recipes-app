import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FavoriteAndShareButtons from './FavoriteAndShareButtons';
import Ingredients from './Ingredients';

function DrinkDetails() {
  const history = useHistory();
  const path = history.location;
  const { drinkDetails } = useSelector((state) => state.drinks);
  let ingredients = [];
  let measure = [];

  const setIsFavorite = () => {
    const recoveredFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (recoveredFavoriteRecipes !== null) {
      const wasFavorited = recoveredFavoriteRecipes
        .some((element) => element.id === path.pathname.split('/')[2]);
      return wasFavorited;
    }
    return false;
  };

  if (drinkDetails.length > 0) {
    Object.entries(drinkDetails[0]).forEach((element) => {
      if (element[0].includes('strIngredient')) {
        ingredients.push(element[1]);
      }
      if (element[0].includes('strMeasure')) {
        measure.push(element[1] === null ? 'undefined' : element[1]);
      }
    });
    drinkDetails[0].isFavorite = setIsFavorite();
  }

  ingredients = [...new Set(ingredients)];
  ingredients.pop();
  ingredients.forEach((element, index) => {
    if (element === '') {
      ingredients.splice(index, 1);
    }
  });
  measure = measure.filter((_, index) => index < ingredients.length);

  return (
    <div>
      {drinkDetails.length > 0 && (
        <>
          <section>
            <img
              data-testid="recipe-photo"
              src={drinkDetails[0].strDrinkThumb}
              alt={drinkDetails[0].strDrink}
            />
            <h1 data-testid="recipe-title">{drinkDetails[0].strDrink}</h1>
            <p data-testid="recipe-category">{drinkDetails[0].strAlcoholic}</p>
          </section>
          <section>
            <FavoriteAndShareButtons
              isFavorite={drinkDetails[0].isFavorite}
            />
            <Ingredients
              ingredients={ingredients}
              measure={measure}
            />
          </section>
          <section>
            <h2>Instructions</h2>
            <p data-testid="instructions">{drinkDetails[0].strInstructions}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default DrinkDetails;
