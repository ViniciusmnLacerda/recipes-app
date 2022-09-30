import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mealsToRenderAction } from '../redux/actions';
import { fetchMeals } from '../services/fetchAPI';

function MealsCards() {
  const dispatch = useDispatch();
  const { mealsToRender } = useSelector((state) => state.meals);

  const fetchDrinksAndMeals = async () => {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const maxRecipesToRender = 12;
    const { meals } = await fetchMeals(endpoint);
    const setMeals = meals.filter((_, index) => index < maxRecipesToRender);
    dispatch(mealsToRenderAction(setMeals));
  };

  useEffect(() => {
    fetchDrinksAndMeals();
  }, []);

  return (
    <main className="recipe-card-container">
      {mealsToRender.length > 0 && (
        mealsToRender.map((meal, index) => {
          const { strMeal, strMealThumb, idMeal } = meal;
          return (
            <div className="recipe-card">
              <a
                className="image-link"
                href={`/meals/${idMeal}`}
                data-testid={`${index}-recipe-card`}
                key={idMeal}
              >
                <img
                  data-testid={`${index}-card-img`}
                  src={strMealThumb}
                  alt={strMeal}
                />
              </a>
              <div className="recipe-link">
                <a
                  className="text-link"
                  href={`/meals/${idMeal}`}
                  data-testid={`${index}-card-name`}
                >
                  {strMeal}
                </a>
              </div>
            </div>
          );
        })
      )}
    </main>
  );
}

export default MealsCards;
