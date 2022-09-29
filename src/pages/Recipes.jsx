import React from 'react';
import { useHistory } from 'react-router-dom';
import Drinks from './Drinks';
import Meals from './Meals';

function Recipes() {
  const history = useHistory();
  const path = history.location.pathname;
  return (
    <div>
      {path.includes('meals') ? (
        <Meals />
      ) : (
        <Drinks />
      )}
    </div>
  );
}

export default Recipes;
