export const LOGIN = 'LOGIN';
export const SHOW_SEARCH = 'SHOW_SEARCH';
export const MEALS_TO_RENDER = 'MEALS_TO_RENDER';
export const DRINKS_TO_RENDER = 'DRINKS_TO_RENDER';
export const SET_CATEGORIES_DRINKS = 'SET_CATEGORIES_DRINKS';
export const SET_CATEGORIES_MEALS = 'SET_CATEGORIES_MEALS';
export const DRINK_DETAIL_TO_RENDER = 'DRINK_DETAIL_TO_RENDER';
export const MEAL_DETAIL_TO_RENDER = 'MEAL_DETAIL_TO_RENDER';
export const SET_RECIPE_TYPE = 'SET_RECIPE_TYPE';
export const DRINKS_TO_RECOMMEND = 'DRINKS_TO_RECOMMEND';
export const MEALS_TO_RECOMMEND = 'MEALS_TO_RECOMMEND';
export const WAS_COPIED = 'WAS_COPIED';
export const IN_PROGRESS = 'IN_PROGRESS';
export const CHECKBOXES = 'CHECKBOXES';
export const LOADING = 'LOADING';

export function login(email) {
  return {
    type: LOGIN,
    payload: email,
  };
}

export function setCategoriesMeals(categories) {
  return {
    type: SET_CATEGORIES_MEALS,
    payload: categories,
  };
}

export function setCategoriesDrinks(categories) {
  return {
    type: SET_CATEGORIES_DRINKS,
    payload: categories,
  };
}

export function showSearch() {
  return { type: SHOW_SEARCH };
}

export function mealsToRenderAction(meals) {
  return {
    type: MEALS_TO_RENDER,
    payload: meals,
  };
}

export function drinksToRenderAction(drinks) {
  return {
    type: DRINKS_TO_RENDER,
    payload: drinks,
  };
}

export function drinkDetailToRender(drink) {
  return {
    type: DRINK_DETAIL_TO_RENDER,
    payload: drink,
  };
}

export function mealDetailToRender(drink) {
  return {
    type: MEAL_DETAIL_TO_RENDER,
    payload: drink,
  };
}

export function setRecipeType(type) {
  return {
    type: SET_RECIPE_TYPE,
    payload: type,
  };
}

export function drinksToRecommend(drinks) {
  return {
    type: DRINKS_TO_RECOMMEND,
    payload: drinks,
  };
}

export function mealsToRecommend(meals) {
  return {
    type: MEALS_TO_RECOMMEND,
    payload: meals,
  };
}

export function wasCopiedAction() {
  return { type: WAS_COPIED };
}

export function inProgressAction(boolean) {
  return {
    type: IN_PROGRESS,
    payload: boolean,
  };
}

export function checkboxesAction(obj) {
  return {
    type: CHECKBOXES,
    payload: obj,
  };
}

export function loadingAction(boolean) {
  return {
    type: LOADING,
    payload: boolean,
  };
}
