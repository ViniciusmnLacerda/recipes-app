import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function RecommendedRecipes() {
  const history = useHistory();
  const path = history.location.pathname;
  const { drinksToRecommend } = useSelector((state) => state.drinks);
  const { mealsToRecommend } = useSelector((state) => state.meals);

  return (
    <section className="recipe-details-recommended">
      <h2>Recommended</h2>
      <div className="recommended-recipes">
        {path.includes('meals') ? (
          drinksToRecommend.map((recipe, index) => (
            <div
              className="recipe-card"
              key={recipe.idDrink}
              data-testid={`${index}-recommendation-card`}
            >
              <a
                className="image-link"
                href={`/drinks/${recipe.idDrink}`}
              >
                <img
                  src={recipe.strDrinkThumb}
                  alt={recipe.strDrink}
                />
              </a>
              <div
                className="recipe-link"
              >
                <a
                  href={`/drinks/${recipe.idDrink}`}
                  data-testid={`${index}-recommendation-title`}
                >
                  {recipe.strDrink}

                </a>
              </div>
            </div>
          ))
        ) : (
          mealsToRecommend.map((recipe, index) => (
            <div
              className="recipe-card"
              key={recipe.idMeal}
              data-testid={`${index}-recommendation-card`}
            >
              <a
                className="image-link"
                href={`/meals/${recipe.idMeal}`}
              >
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                />
              </a>
              <div
                className="recipe-link"
              >
                <a
                  data-testid={`${index}-recommendation-title`}
                  href={`/meals/${recipe.idMeal}`}
                >
                  {recipe.strMeal}

                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default RecommendedRecipes;
