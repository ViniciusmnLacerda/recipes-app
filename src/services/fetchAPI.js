export const fetchMeals = async (endpoint) => {
  try {
    const request = await fetch(endpoint);
    const data = await request.json();
    if (data.meals !== null) {
      return data;
    }
    return { meals: [] };
  } catch {
    return { meals: [] };
  }
};

export const fetchDrinks = async (endpoint) => {
  try {
    const request = await fetch(endpoint);
    const data = await request.json();
    if (data.drinks !== null) {
      return data;
    }
    return { drinks: [] };
  } catch {
    return { drinks: [] };
  }
};

export const fetchMealsCategories = async () => {
  try {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const request = await fetch(endpoint);
    const data = await request.json();
    return data.meals;
  } catch {
    return [];
  }
};

export const fetchDrinksCategories = async () => {
  try {
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const request = await fetch(endpoint);
    const data = await request.json();
    return data.drinks;
  } catch {
    return [];
  }
};

export const fetchCategory = async (endpoint, path) => {
  try {
    const request = await fetch(endpoint);
    const data = await request.json();
    return data[path];
  } catch {
    return [];
  }
};

export const fetchRecipeDetails = async (endpoint) => {
  try {
    const request = await fetch(endpoint);
    const data = await request.json();
    return data;
  } catch {
    return [];
  }
};
