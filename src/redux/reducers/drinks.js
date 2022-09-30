/* eslint-disable comma-dangle */
/* eslint-disable default-param-last */
import {
  DRINKS_TO_RECOMMEND, DRINKS_TO_RENDER,
  DRINK_DETAIL_TO_RENDER,
  SET_CATEGORIES_DRINKS
} from '../actions/index';

const INITIAL_STATE = {
  drinksToRender: [],
  drinkDetails: [],
  categories: [],
  drinksToRecommend: [],
};

function drinks(state = INITIAL_STATE, action) {
  switch (action.type) {
    case DRINKS_TO_RENDER:
      return {
        ...state,
        drinksToRender: action.payload,
      };
    case SET_CATEGORIES_DRINKS:
      return {
        ...state,
        categories: action.payload,
      };
    case DRINK_DETAIL_TO_RENDER:
      return {
        ...state,
        drinkDetails: action.payload,
      };
    case DRINKS_TO_RECOMMEND:
      return {
        ...state,
        drinksToRecommend: action.payload,
      };
    default:
      return state;
  }
}

export default drinks;
