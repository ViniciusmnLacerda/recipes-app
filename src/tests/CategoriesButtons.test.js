import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import beefMeals from '../../cypress/mocks/beefMeals';
import cocktailDrinks from '../../cypress/mocks/cocktailDrinks';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import drinks from '../../cypress/mocks/drinks';
import mealCategories from '../../cypress/mocks/mealCategories';
import meals from '../../cypress/mocks/meals';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockInitialDrinks from './mocks/mockInitialDrinks';
import mockInitalMeals from './mocks/mockInitialMeals';
import initialState from './mocks/mockInitialState';

const pathMeals = '/meals';
const pathDrinks = '/drinks';
const ZeroCardName = '0-card-name';

describe('Test CategoriesButtons on meals page', () => {
  beforeEach(() => {
    cleanup();
    jest.restoreAllMocks();
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mealCategories)
        .mockResolvedValueOnce(mealCategories)
        .mockResolvedValueOnce(beefMeals)
        .mockResolvedValue(meals),
    });
  });
  it('test fetch by category beef', async () => {
    initialState.meals.mealsToRender = mockInitalMeals;
    initialState.user.isSearchVisible = true;
    renderWithRouterAndRedux(<App />, { initialState, initialEntries: [pathMeals] });

    const beefCategoryFilter = screen.getByTestId('Beef-category-filter');
    expect(beefCategoryFilter).toBeInTheDocument();

    userEvent.click(beefCategoryFilter);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
      const zeroCardName = screen.getByTestId(ZeroCardName);
      expect(zeroCardName).toBeInTheDocument();
      expect(zeroCardName).toHaveTextContent(/Beef and Mustard Pie/i);
    });

    userEvent.click(beefCategoryFilter);
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
      const zeroCardName = screen.getByTestId(ZeroCardName);
      expect(zeroCardName).toBeInTheDocument();
      expect(zeroCardName).toHaveTextContent(/corba/i);
    });
  });
});

describe('Test CategoriesButtons on drinks page', () => {
  beforeEach(() => {
    cleanup();
    jest.restoreAllMocks();
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(drinkCategories)
        .mockResolvedValueOnce(drinkCategories)
        .mockResolvedValueOnce(cocktailDrinks)
        .mockResolvedValue(drinks),
    });
  });
  it('test fetch by category beef', async () => {
    initialState.drinks.drinksToRender = mockInitialDrinks;
    initialState.user.isSearchVisible = true;
    renderWithRouterAndRedux(<App />, { initialState, initialEntries: [pathDrinks] });

    const cocktailCategoryFilter = screen.getByTestId('Cocktail-category-filter');
    expect(cocktailCategoryFilter).toBeInTheDocument();

    userEvent.click(cocktailCategoryFilter);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
      const zeroCardName = screen.getByTestId(ZeroCardName);
      expect(zeroCardName).toBeInTheDocument();
      expect(zeroCardName).toHaveTextContent(/57 Chevy with a White License Plate/i);
    });

    userEvent.click(cocktailCategoryFilter);
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
      const zeroCardName = screen.getByTestId(ZeroCardName);
      expect(zeroCardName).toBeInTheDocument();
      expect(zeroCardName).toHaveTextContent(/GG/i);
    });
  });
});
