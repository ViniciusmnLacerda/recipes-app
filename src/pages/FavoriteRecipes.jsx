import clipboardCopy from "clipboard-copy";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TypeButtons from "../components/TypeButtons";
import blackHeartIcon from "../images/blackHeartIcon.svg";
import shareIcon from "../images/shareIcon.svg";

function FavoriteRecipes() {
  const [isLinkCopied, setIsLinkCopied] = React.useState(false);
  const [unFavReRender, setUnFavReRender] = React.useState(false);
  const favRecipes = JSON.parse(localStorage.getItem("favoriteRecipes"));
  const { recipeTypeFilter } = useSelector((state) => state.user);

  const handleShare = (type, id) => {
    if (type === "drink") {
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
    localStorage.setItem("favoriteRecipes", JSON.stringify(newFaves));
    setUnFavReRender(!unFavReRender);
  };

  return (
    <>
      <Header pageTitle="Favorite Recipes" searchVisible={false} />
      <TypeButtons />
      {isLinkCopied && <p>Link copied!</p>}
      <div className="meal-card-container">
        {favRecipes ? (
          favRecipes
            .filter((recipe) => {
              switch (recipeTypeFilter) {
                case "Meals":
                  return recipe.type === "meal";
                case "Drinks":
                  return recipe.type === "drink";
                default:
                  return true;
              }
            })
            .map((recipe, index) => (
              <div key={index} className="fav-recipe-card meal-card">
                <Link to={`/${recipe.type}s/${recipe.id}`}>
                  <img
                    data-testid={`${index}-horizontal-image`}
                    src={recipe.image}
                    alt={recipe.name}
                  />
                </Link>
                <div className="meal-card-description">
                  <div data-testid={`${index}-horizontal-top-text`}>
                    {recipe.type === "meal"
                      ? `${recipe.nationality} - ${recipe.category}`
                      : `${recipe.alcoholicOrNot}`}
                  </div>
                  <Link to={`/${recipe.type}s/${recipe.id}`}>
                    <div className="meal-card-bottom" data-testid={`${index}-horizontal-name`}>{recipe.name}</div>
                  </Link>
                </div>
                <input
                    type="image"
                    className="meal-card-button"
                    data-testid={`${index}-horizontal-share-btn`}
                    onClick={() => handleShare(recipe.type, recipe.id)}
                    src={shareIcon}
                    alt="share icon"
                  />
                <input
                  type="image"
                  className="meal-card-button fav"
                  data-testid={`${index}-horizontal-favorite-btn`}
                  onClick={() => handleUnFavorite(favRecipes, recipe.id)}
                  src={blackHeartIcon}
                  alt="unfav-btn"
                />
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
