export const mockUser = { email: 'grupo20@trybe.com' };

export const mockInProgressRecipes = {
  drinks: {
    17222: ['Gin', 'Grand Marnier', 'Lemon Juice', 'Grenadine'],
  },
  meals: {
    52977: ['Lentils', 'Onion', 'Carrots', 'Tomato Puree', 'Cumin', 'Paprika', 'Mint', 'Thyme', 'Black Pepper', 'Red Pepper Flakes', 'Vegetable Stock', 'Water', 'Sea Salt'],
  },
};

export const mockFavoriteRecipes = [
  {
    alcoholicOrNot: '',
    category: 'Seafood',
    id: '53065',
    image: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
    name: 'Sushi',
    nationality: 'Japanese',
    type: 'meal',
  },
];

export const mockMealsToken = 1;

export const mockDrinksToken = 1;

export const mockControlCheckboxes = {
  drinks: {
    17222: {
      'ingredient-checkbox-0': false,
      'ingredient-checkbox-1': true,
      'ingredient-checkbox-2': true,
      'ingredient-checkbox-3': true,
    },
  },
  meals: {
    52977: {
      'ingredient-checkbox-2': true,
      'ingredient-checkbox-3': true,
      'ingredient-checkbox-5': true,
      'ingredient-checkbox-8': true,
    },
  },
};

export const mockDoneRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];
