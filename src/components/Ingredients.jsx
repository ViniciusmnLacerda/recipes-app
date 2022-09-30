import PropTypes, { string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { checkboxesAction } from '../redux/actions';

function Ingredients({ ingredients, measure }) {
  const { inProgress, checkboxes, loading } = useSelector((state) => state.user);
  const { mealDetails } = useSelector((state) => state.meals);
  const { drinkDetails } = useSelector((state) => state.drinks);
  const [controlCheckboxes, setControlCheckboxes] = useState({});
  const [defaultChecked, setDefaultChecked] = useState({});
  const history = useHistory();
  const path = history.location.pathname.split('/');
  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    const { name, checked } = target;
    setControlCheckboxes({
      ...controlCheckboxes,
      [name]: checked,
    });
    checkboxes[name] = checked;
    dispatch(checkboxesAction(checkboxes));
  };

  const getDefaultChecked = () => {
    const recovered = JSON.parse(localStorage.getItem('controlCheckboxes'));
    if (recovered !== null && Object.keys(recovered).length > 0) {
      const controlDefaultChecked = recovered[path[1]][path[2]];
      if (controlDefaultChecked !== undefined) {
        setDefaultChecked(controlDefaultChecked);
        dispatch(checkboxesAction(controlDefaultChecked));
        setControlCheckboxes(controlDefaultChecked);
        dispatch(checkboxesAction(controlDefaultChecked));
      }
    }
  };

  useEffect(() => {
    const checkboxesObj = {};
    ingredients.forEach((ingrediet, index) => {
      checkboxesObj[`ingredient-checkbox-${index}`] = false;
    });
    setControlCheckboxes(checkboxesObj);
    setDefaultChecked(checkboxesObj);
    dispatch(checkboxesAction(checkboxesObj));
    getDefaultChecked(checkboxesObj);
  }, []);

  const setRecipesInProgressMeals = () => {
    const recovered = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let inProgressObj = {};
    const { idMeal } = mealDetails[0];
    if (recovered !== null && Object.keys(recovered).length > 0) {
      recovered.meals[idMeal] = ingredients;
      localStorage.setItem('inProgressRecipes', JSON.stringify(recovered));
    } else {
      inProgressObj = {
        meals: {
          [idMeal]: ingredients,
        },
        drinks: {},
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressObj));
    }
  };

  const setControlCheckboxesMeals = () => {
    const recovered = JSON.parse(localStorage.getItem('controlCheckboxes'));
    let controlCheckboxesObj = {};
    const { idMeal } = mealDetails[0];
    if (recovered !== null && Object.keys(recovered).length > 0) {
      recovered.meals[idMeal] = checkboxes;
      localStorage.setItem('controlCheckboxes', JSON.stringify(recovered));
    } else {
      controlCheckboxesObj = {
        meals: {
          [idMeal]: checkboxes,
        },
        drinks: {},
      };
      localStorage.setItem('controlCheckboxes', JSON.stringify(controlCheckboxesObj));
    }
  };

  const setRecipesInProgressDrinks = () => {
    const recovered = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let inProgressObj = {};
    const { idDrink } = drinkDetails[0];
    if (recovered !== null && Object.keys(recovered).length > 0) {
      recovered.drinks[idDrink] = ingredients;
      localStorage.setItem('inProgressRecipes', JSON.stringify(recovered));
    } else {
      inProgressObj = {
        meals: {},
        drinks: {
          [idDrink]: ingredients,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressObj));
    }
  };

  const setControlCheckboxesDrinks = () => {
    const recovered = JSON.parse(localStorage.getItem('controlCheckboxes'));
    let controlCheckboxesObj = {};
    const { idDrink } = drinkDetails[0];
    if (recovered !== null && Object.keys(recovered).length > 0) {
      recovered.drinks[idDrink] = checkboxes;
      localStorage.setItem('controlCheckboxes', JSON.stringify(recovered));
    } else {
      controlCheckboxesObj = {
        meals: {},
        drinks: {
          [idDrink]: checkboxes,
        },
      };
      localStorage.setItem('controlCheckboxes', JSON.stringify(controlCheckboxesObj));
    }
  };

  useEffect(() => {
    if (path[1] === 'meals') {
      setRecipesInProgressMeals();
      setControlCheckboxesMeals();
    } else {
      setRecipesInProgressDrinks();
      setControlCheckboxesDrinks();
    }
  }, [controlCheckboxes]);

  return (
    <>
      <h2>Ingredients</h2>
      {!inProgress ? (
        <ul>
          {ingredients.map((ingredient, index) => (
            <li
              data-testid={`${index}-ingredient-name-and-measure`}
              key={ingredient}
            >
              {`${ingredient} - ${measure[index]}`}
            </li>
          ))}
        </ul>
      ) : (
        !loading && (
          <div className="ingredients-inprogress">
            {ingredients.map((ingredient, index) => (
              <label
                key={ingredient}
                htmlFor={`ingredient-checkbox-${index}`}
                data-testid={`${index}-ingredient-step`}
                className={
                  checkboxes[`ingredient-checkbox-${index}`] ? 'completed' : undefined
                }
              >
                <input
                  type="checkbox"
                  name={`ingredient-checkbox-${index}`}
                  id={`ingredient-checkbox-${index}`}
                  checked={controlCheckboxes[`ingredient-checkbox-${index}`]}
                  onChange={handleChange}
                  defaultChecked={defaultChecked[`ingredient-checkbox-${index}`]}
                />
                {`${ingredient} - ${measure[index]}`}
              </label>
            ))}
          </div>
        )
      )}
    </>
  );
}

Ingredients.propTypes = {
  ingredients: PropTypes.arrayOf(string).isRequired,
  measure: PropTypes.arrayOf(string).isRequired,
};

export default Ingredients;
