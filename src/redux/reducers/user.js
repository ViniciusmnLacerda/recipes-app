import {
  CHECKBOXES,
  IN_PROGRESS,
  LOADING, LOGIN,
  SET_RECIPE_TYPE,
  SHOW_SEARCH,
  WAS_COPIED,
} from '../actions';

const INITIAL_STATE = {
  email: '',
  isSearchVisible: false,
  recipeTypeFilter: 'All',
  wasCopied: false,
  inProgress: false,
  checkboxes: {},
  recipesInProgress: {},
  loading: false,
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      email: action.payload,
    };
  case SHOW_SEARCH:
    return {
      ...state,
      isSearchVisible: !state.isSearchVisible,
    };
  case SET_RECIPE_TYPE:
    return {
      ...state,
      recipeTypeFilter: action.payload,
    };
  case WAS_COPIED:
    return {
      ...state,
      wasCopied: !state.wasCopied,
    };
  case IN_PROGRESS:
    return {
      ...state,
      inProgress: action.payload,
    };
  case CHECKBOXES:
    return {
      ...state,
      checkboxes: action.payload,
    };
  case LOADING:
    return {
      ...state,
      loading: action.payload,
    };
  default:
    return state;
  }
}

export default user;
