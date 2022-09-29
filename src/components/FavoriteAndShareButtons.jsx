import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import {
  drinkDetailToRender, mealDetailToRender, wasCopiedAction
} from '../redux/actions';

function FavoriteAndShareButtons({ isFavorite }) {
  const history = useHistory();
  const path = history.location;
  const pathCopy = window.location;
  const dispatch = useDispatch();
  const { wasCopied } = useSelector((state) => state.user);
  const { drinkDetails } = useSelector((state) => state.drinks);
  const { mealDetails } = useSelector((state) => state.meals);

  const handleShare = () => {
    dispatch(wasCopiedAction());
    const threeSeconds = 3000;
    copy(pathCopy.href.split('/in-progress')[0]);
    setTimeout(() => {
      dispatch(wasCopiedAction());
    }, threeSeconds);
  };

  const fixRecipeDetailsToRender = (type, boolean) => {
    if (type === 'meals') {
      mealDetails[0].isFavorite = boolean;
      dispatch(mealDetailToRender(mealDetails));
    } else {
      drinkDetails[0].isFavorite = boolean;
      dispatch(drinkDetailToRender(drinkDetails));
    }
  };

  const setAlcoholic = (type) => {
    if (type === 'meal') {
      return '';
    }
    switch (drinkDetails[0].strAlcoholic) {
    case 'Optional alcohol':
      return 'Optional alcoholic';
    case 'Alcoholic':
      return 'Alcoholic';
    case 'Non alcoholic':
      return 'Non alcoholic';
    default:
    }
  };

  const setFavoriteRecipe = (type) => {
    const favoriteRecipe = {
      id: path.pathname.split('/')[2],
      type,
      nationality: type === 'meal' ? mealDetails[0].strArea : '',
      category: type === 'meal'
        ? mealDetails[0].strCategory : drinkDetails[0].strCategory,
      alcoholicOrNot: setAlcoholic(type),
      name: type === 'meal' ? mealDetails[0].strMeal : drinkDetails[0].strDrink,
      image: type === 'meal'
        ? mealDetails[0].strMealThumb : drinkDetails[0].strDrinkThumb,
    };
    return favoriteRecipe;
  };

  const addFavorite = () => {
    let recoveredFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (path.pathname.includes('meals')) {
      const favoriteRecipe = setFavoriteRecipe('meal');
      if (recoveredFavoriteRecipes === null) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteRecipe]));
        fixRecipeDetailsToRender('meals', true);
      } else {
        recoveredFavoriteRecipes = [...recoveredFavoriteRecipes, favoriteRecipe];
        localStorage.setItem('favoriteRecipes', JSON.stringify(recoveredFavoriteRecipes));
        fixRecipeDetailsToRender('meals', true);
      }
    } else {
      const favoriteRecipe = setFavoriteRecipe('drink');
      if (recoveredFavoriteRecipes === null) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteRecipe]));
        fixRecipeDetailsToRender('drinks', true);
      } else {
        recoveredFavoriteRecipes = [...recoveredFavoriteRecipes, favoriteRecipe];
        localStorage.setItem('favoriteRecipes', JSON.stringify(recoveredFavoriteRecipes));
        fixRecipeDetailsToRender('drinks', true);
      }
    }
  };

  const removeFavorite = () => {
    const recoveredFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const setFavoriteRecipes = recoveredFavoriteRecipes
      .filter((element) => element.id !== path.pathname.split('/')[2]);
    localStorage.setItem('favoriteRecipes', JSON.stringify(setFavoriteRecipes));
    fixRecipeDetailsToRender(path.pathname.split('/')[1], false);
  };

  const handleFavorite = () => {
    const recoveredFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (recoveredFavoriteRecipes !== null) {
      const addOrRemove = recoveredFavoriteRecipes
        .some((element) => element.id === path.pathname.split('/')[2]);
      if (addOrRemove) {
        removeFavorite();
      } else {
        addFavorite();
      }
    } else {
      addFavorite();
    }
  };

  return (
    <div className="favorite-and-share">
      <input
        type="image"
        data-testid="share-btn"
        onClick={ handleShare }
        src={ shareIcon }
        alt="share icon"
      />
      <input
        type="image"
        data-testid="favorite-btn"
        onClick={ handleFavorite }
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="share icon"
      />
      {wasCopied && <p>Link copied!</p>}
    </div>
  );
}

FavoriteAndShareButtons.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
};

export default FavoriteAndShareButtons;
