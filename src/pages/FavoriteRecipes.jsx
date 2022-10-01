/* eslint-disable react/no-array-index-key */
import clipboardCopy from 'clipboard-copy';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import TypeButtons from '../components/TypeButtons';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../styles/UserRecipes.css';

function FavoriteRecipes() {
  const [isLinkCopied, setIsLinkCopied] = React.useState(false);
  const [unFavReRender, setUnFavReRender] = React.useState(false);
  const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const { recipeTypeFilter } = useSelector((state) => state.user);

  const handleShare = (type, id) => {
    if (type === 'drink') {
      clipboardCopy(`http://localhost:3000/drinks/${id}`);
    } else {
      clipboardCopy(`http://localhost:3000/meals/${id}`);
    }
    setIsLinkCopied(true);
    const threeSeconds = 3000;
    setTimeout(() => {
      setIsLinkCopied(false);
    }, threeSeconds);
  };

  const handleUnFavorite = (favRecipesArr, id) => {
    const newFaves = favRecipesArr.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFaves));
    setUnFavReRender(!unFavReRender);
  };

  return (
    <>
      <Header pageTitle="Favorite Recipes" searchVisible={false} />
      <div className="nav-recipes-buttons">
        <TypeButtons />
      </div>
      {isLinkCopied && <p>Link copied!</p>}
      <div className="user-recipe-container">
        {favRecipes ? (
          favRecipes
            .filter((recipe) => {
              switch (recipeTypeFilter) {
                case 'Meals':
                  return recipe.type === 'meal';
                case 'Drinks':
                  return recipe.type === 'drink';
                default:
                  return true;
              }
            })
            .map((recipe, index) => (
              <div key={index} className="user-recipe-card">
                <Link
                  className="user-recipe-image"
                  to={`/${recipe.type}s/${recipe.id}`}
                >
                  <img
                    data-testid={`${index}-horizontal-image`}
                    src={recipe.image}
                    alt={recipe.name}
                  />
                </Link>
                <div className="user-recipe-description">
                  <div className="user-recipe-title" data-testid={`${index}-horizontal-top-text`}>
                    {recipe.type === 'meal'
                      ? <p>{`${recipe.nationality} - ${recipe.category}`}</p>
                      : <p>{`${recipe.alcoholicOrNot}`}</p> }
                    <Link to={`/${recipe.type}s/${recipe.id}`}>
                      {recipe.name}
                    </Link>
                  </div>
                  <div className="recipe-card-bottom">
                    <input
                      type="image"
                      data-testid={`${index}-horizontal-share-btn`}
                      onClick={() => handleShare(recipe.type, recipe.id)}
                      src={shareIcon}
                      alt="share icon"
                    />
                    <input
                      type="image"
                      data-testid={`${index}-horizontal-favorite-btn`}
                      onClick={() => handleUnFavorite(favRecipes, recipe.id)}
                      src={blackHeartIcon}
                      className="favorite-heart"
                      alt="unfav-btn"
                    />
                  </div>
                </div>
              </div>
            ))
        ) : (
          <p className="no-recipes">No favorite recipes</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default FavoriteRecipes;
