import clipboardCopy from "clipboard-copy";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TypeButtons from "../components/TypeButtons";
import shareIcon from "../images/shareIcon.svg";

function DoneRecipes() {
  const [isLinkCopied, setIsLinkCopied] = React.useState(false);
  const doneRecipes = JSON.parse(localStorage.getItem("doneRecipes"));
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

  return (
    <>
      <Header pageTitle="Done Recipes" searchVisible={false} />
      <TypeButtons />
      {isLinkCopied && <p>Link copied!</p>}
      <div className="meal-card-container">
        {doneRecipes ? (
          doneRecipes
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
              <div key={index} className="done-recipe-card meal-card">
                <Link to={`/${recipe.type}s/${recipe.id}` } className="meal-card-image">
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
                    <div className="meal-card-title" data-testid={`${index}-horizontal-name`}>{recipe.name}</div>
                  </Link>
                  <p className="meal-card-date" data-testid={`${index}-horizontal-done-date`}>
                    {recipe.doneDate}
                  </p>
                  {recipe.type === "meal" && (
                    <div className="meal-card-bottom">
                      {recipe.tags.map(
                        (tag, tIndex) =>
                          tIndex < 2 && (
                            <span
                              key={`${tag}-${tIndex}`}
                              data-testid={`${index}-${tag}-horizontal-tag`}
                            >
                              {`${tag} `}
                            </span>
                          )
                      )}
                  </div>
                )}
                </div>
                <input
                  type="image"
                  data-testid={`${index}-horizontal-share-btn`}
                  className="meal-card-button"
                  onClick={() => handleShare(recipe.type, recipe.id)}
                  src={shareIcon}
                  alt="share icon"
                />
              </div>
            ))
        ) : (
          <p className="no-recipes">No recipes completed yet</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default DoneRecipes;
