import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function RecommendedRecipes() {
  const history = useHistory();
  const path = history.location.pathname;
  const { drinksToRecommend } = useSelector((state) => state.drinks);
  const { mealsToRecommend } = useSelector((state) => state.meals);

  return (
    <div>
      <h2>Recommended</h2>
      <section className="recommended-recipes">
        {path.includes('meals') ? (
          drinksToRecommend.map((recipe, index) => (
            <div
              className="card-recommended-recipe"
              key={ recipe.idDrink }
              data-testid={ `${index}-recommendation-card` }
            >
              <a href={ `/drinks/${recipe.idDrink}` }
              >
                <img
                  src={ recipe.strDrinkThumb }
                  alt={ recipe.strDrink }
                />
              </a>
              <a href={ `/drinks/${recipe.idDrink}` }>
                <h3 data-testid={ `${index}-recommendation-title` }>{recipe.strDrink}</h3>
              </a>
            </div>
          ))
        ) : (
          mealsToRecommend.map((recipe, index) => (
            <div
              className="card-recommended-recipe"
              key={ recipe.idMeal }
              data-testid={ `${index}-recommendation-card` }
            >
              <a href={ `/meals/${recipe.idMeal}` }>
                <img
                  src={ recipe.strMealThumb }
                  alt={ recipe.strMeal }
                />
              </a>
              <a href={ `/meals/${recipe.idMeal}` }>
                <h3 data-testid={ `${index}-recommendation-title` }>{recipe.strMeal}</h3>
              </a>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default RecommendedRecipes;
