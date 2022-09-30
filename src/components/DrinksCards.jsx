import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { drinksToRenderAction } from '../redux/actions';
import { fetchDrinks } from '../services/fetchAPI';

function DrinksCards() {
  const dispatch = useDispatch();
  const { drinksToRender } = useSelector((state) => state.drinks);

  const fetchDrinksAndMeals = async () => {
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const maxRecipesToRender = 12;
    const { drinks } = await fetchDrinks(endpoint);
    const setDrinks = drinks.filter((_, index) => index < maxRecipesToRender);
    dispatch(drinksToRenderAction(setDrinks));
  };

  useEffect(() => {
    fetchDrinksAndMeals();
  }, []);

  return (
    <main className="recipe-card-container">
      {drinksToRender.length > 0 && (
        drinksToRender.map((meal, index) => {
          const { strDrink, strDrinkThumb, idDrink } = meal;
          return (
            <div className="recipe-card">
              <a
                className="image-link"
                href={`/drinks/${idDrink}`}
                data-testid={`${index}-recipe-card`}
                key={idDrink}
              >
                <img
                  data-testid={`${index}-card-img`}
                  src={strDrinkThumb}
                  alt={strDrink}
                />
              </a>
              <div className="recipe-link">
                <a
                  className="text-link"
                  href={`/drinks/${idDrink}`}
                  data-testid={`${index}-card-name`}
                >
                  {strDrink}
                </a>
              </div>
            </div>
          );
        })
      )}
    </main>
  );
}

export default DrinksCards;
