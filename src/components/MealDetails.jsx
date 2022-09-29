import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FavoriteAndShareButtons from './FavoriteAndShareButtons';
import Ingredients from './Ingredients';
import Video from './Video';

function MealDetails() {
  const history = useHistory();
  const path = history.location;
  const { mealDetails } = useSelector((state) => state.meals);
  const { inProgress } = useSelector((state) => state.user);
  let ingredients = [];
  let measure = [];
  let urlYoutube = '';

  const setIsFavorite = () => {
    const recoveredFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (recoveredFavoriteRecipes !== null) {
      const wasFavorited = recoveredFavoriteRecipes
        .some((element) => element.id === path.pathname.split('/')[2]);
      return wasFavorited;
    }
    return false;
  };

  if (mealDetails.length > 0) {
    Object.entries(mealDetails[0]).forEach((element) => {
      if (element[0].includes('strIngredient')) {
        ingredients.push(element[1]);
      }
      if (element[0].includes('strMeasure')) {
        measure.push(element[1]);
      }
    });
    mealDetails[0].isFavorite = setIsFavorite();
    urlYoutube = `https://www.youtube.com/embed/${mealDetails[0].strYoutube.split('/')[3].split('v=')[1]}`;
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
      {mealDetails.length > 0 && (
        <>
          <section>
            <img
              data-testid="recipe-photo"
              src={ mealDetails[0].strMealThumb }
              alt={ mealDetails[0].strMeal }
            />
            <h1 data-testid="recipe-title">{mealDetails[0].strMeal}</h1>
            <p data-testid="recipe-category">{mealDetails[0].strCategory}</p>
          </section>
          <section>
            <FavoriteAndShareButtons
              isFavorite={ mealDetails[0].isFavorite }
            />
            <Ingredients
              ingredients={ ingredients }
              measure={ measure }
            />
          </section>
          <section>
            <h2>Instructions</h2>
            <p data-testid="instructions">{mealDetails[0].strInstructions}</p>
          </section>
          {!inProgress && (
            <section>
              <h2>Video</h2>
              <Video
                urlYoutube={ urlYoutube }
              />
            </section>
          )}
        </>
      )}
    </div>
  );
}

export default MealDetails;
