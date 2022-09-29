import {
  MEALS_TO_RECOMMEND,
  MEALS_TO_RENDER,
  MEAL_DETAIL_TO_RENDER,
  SET_CATEGORIES_MEALS,
} from '../actions';

const INITIAL_STATE = {
  mealsToRender: [],
  categories: [],
  mealDetails: [],
  mealsToRecommend: [],
};

function meals(state = INITIAL_STATE, action) {
  switch (action.type) {
  case MEALS_TO_RENDER:
    return {
      ...state,
      mealsToRender: action.payload,
    };
  case SET_CATEGORIES_MEALS:
    return {
      ...state,
      categories: action.payload,
    };
  case MEAL_DETAIL_TO_RENDER:
    return {
      ...state,
      mealDetails: action.payload,
    };
  case MEALS_TO_RECOMMEND:
    return {
      ...state,
      mealsToRecommend: action.payload,
    };
  default:
    return state;
  }
}

export default meals;
