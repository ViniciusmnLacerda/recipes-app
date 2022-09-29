import React from 'react';
import { useDispatch } from 'react-redux';
import { setRecipeType } from '../redux/actions';

function TypeButtons() {
  const dispatch = useDispatch();

  const handleClick = (type) => {
    dispatch(setRecipeType(type));
  };

  return (
    <>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => handleClick('All') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ () => handleClick('Meals') }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => handleClick('Drinks') }
      >
        Drinks
      </button>
    </>
  );
}

export default TypeButtons;
