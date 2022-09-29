import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import chickenMeals from '../../cypress/mocks/chickenMeals';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import mealCategories from '../../cypress/mocks/mealCategories';
import milkDrinks from '../../cypress/mocks/milkDrinks';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockInitialDrinks from './mocks/mockInitialDrinks';
import mockInitalMeals from './mocks/mockInitialMeals';
import initialState from './mocks/mockInitialState';

const pathMeals = '/meals';
const pathDrinks = '/drinks';
const btnSearch = 'search-top-btn';
const inputSearch = 'search-input';
const execSearchButton = 'exec-search-btn';
const ingredientSearchRadioText = 'ingredient-search-radio';

describe('Test the SearchBar - rendering and alerts - on meals page', () => {
  beforeEach(() => {
    cleanup();
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mealCategories) // aqui é o fetch de categorias
        .mockResolvedValueOnce(mealCategories)
        .mockResolvedValue({ meals: [] }), // aqui é o fetch de busca de comidas/bebidas
    });
  });
  it('Test rendering, initial values and form searchbar', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [pathMeals] });
    const searchTopBtn = screen.getByTestId('open-searchbar');
    expect(searchTopBtn).toBeInTheDocument();
    userEvent.click(searchTopBtn);
    const searchInput = screen.getByTestId(inputSearch);
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'camarão');
    expect(searchInput).toHaveValue('camarão');
    const ingredientSearchRadio = screen.getByTestId(ingredientSearchRadioText);
    expect(ingredientSearchRadio).toBeInTheDocument();
    expect(ingredientSearchRadio).not.toBeChecked();
    userEvent.click(ingredientSearchRadio);
    expect(ingredientSearchRadio).toBeChecked();
  });
  it('test the alert by not found', async () => {
    global.alert = jest.fn();
    renderWithRouterAndRedux(<App />, { initialEntries: [pathMeals] });
    const searchTopBtn = screen.getByTestId(btnSearch);
    userEvent.click(searchTopBtn);

    const ingredientSearchRadio = screen.getByTestId(ingredientSearchRadioText);
    expect(ingredientSearchRadio).toBeInTheDocument();
    userEvent.click(ingredientSearchRadio);

    const searchInput = screen.getByTestId(inputSearch);
    userEvent.type(searchInput, 'xablau');
    expect(searchInput).toHaveValue('xablau');

    const execSearchBtn = screen.getByTestId(execSearchButton);
    expect(execSearchBtn).toBeInTheDocument();
    userEvent.click(execSearchBtn);

    await waitFor(() => {
      expect(alert).toHaveBeenCalled();
      expect(alert).toBeCalledWith('Sorry, we haven\'t found any recipes for these filters.');
    });
    global.alert.mockReset();
  });
  it('test the alert by firstletter', () => {
    global.alert = jest.fn();
    renderWithRouterAndRedux(<App />, { initialEntries: [pathMeals] });

    const searchTopBtn = screen.getByTestId(btnSearch);
    userEvent.click(searchTopBtn);

    const firstLetterSearchRadio = screen.getByTestId('first-letter-search-radio');
    expect(firstLetterSearchRadio).toBeInTheDocument();
    userEvent.click(firstLetterSearchRadio);

    const searchInput = screen.getByTestId(inputSearch);
    userEvent.type(searchInput, 'chicken');

    const execSearchBtn = screen.getByTestId(execSearchButton);
    userEvent.click(execSearchBtn);

    expect(alert).toHaveBeenCalled();
    expect(alert).toBeCalledWith('Your search must have only 1 (one) character');
    global.alert.mockReset();
  });
});

describe('Test the searchbar on meals page', () => {
  beforeEach(() => {
    cleanup();
    jest.restoreAllMocks();
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mealCategories) // aqui é o fetch de categorias
        .mockResolvedValueOnce(mealCategories)
        .mockResolvedValue(chickenMeals), // aqui é o fetch de busca de comidas/bebidas
    });
  });
  it('test searching by name', async () => {
    initialState.meals.mealsToRender = mockInitalMeals;
    initialState.user.isSearchVisible = true;
    renderWithRouterAndRedux(<App />, { initialState, initialEntries: [pathMeals] });

    const searchInput = screen.getByTestId(inputSearch);
    userEvent.type(searchInput, 'chicken');
    expect(searchInput).toHaveValue('chicken');

    const ingredientSearchRadio = screen.getByTestId(ingredientSearchRadioText);
    expect(ingredientSearchRadio).toBeInTheDocument();
    userEvent.click(ingredientSearchRadio);

    const execSearchBtn = screen.getByTestId(execSearchButton);
    expect(execSearchBtn).toBeInTheDocument();
    userEvent.click(execSearchBtn);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
      const zeroCardName = screen.getByTestId('0-card-name');
      expect(zeroCardName).toBeInTheDocument();
      expect(zeroCardName).toHaveTextContent(/Brown Stew Chicken/i);
    });
  });
});

describe('Test the SearchBar - rendering and alerts - on drinks page', () => {
  beforeEach(() => {
    cleanup();
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(drinkCategories) // aqui é o fetch de categorias
        .mockResolvedValueOnce(drinkCategories)
        .mockResolvedValue({ drinks: [] }), // aqui é o fetch de busca de comidas/bebidas
    });
  });
  it('Test rendering, initial values and form searchbar', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [pathDrinks] });
    const searchTopBtn = screen.getByTestId('open-searchbar');
    expect(searchTopBtn).toBeInTheDocument();
    userEvent.click(searchTopBtn);
    const searchInput = screen.getByTestId(inputSearch);
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'camarão');
    expect(searchInput).toHaveValue('camarão');
    const ingredientSearchRadio = screen.getByTestId(ingredientSearchRadioText);
    expect(ingredientSearchRadio).toBeInTheDocument();
    expect(ingredientSearchRadio).not.toBeChecked();
    userEvent.click(ingredientSearchRadio);
    expect(ingredientSearchRadio).toBeChecked();
  });
  it('test the alert by not found', async () => {
    global.alert = jest.fn();
    renderWithRouterAndRedux(<App />, { initialEntries: [pathDrinks] });
    const searchTopBtn = screen.getByTestId(btnSearch);
    userEvent.click(searchTopBtn);

    const ingredientSearchRadio = screen.getByTestId(ingredientSearchRadioText);
    expect(ingredientSearchRadio).toBeInTheDocument();
    userEvent.click(ingredientSearchRadio);

    const searchInput = screen.getByTestId(inputSearch);
    userEvent.type(searchInput, 'xablau');
    expect(searchInput).toHaveValue('xablau');

    const execSearchBtn = screen.getByTestId(execSearchButton);
    expect(execSearchBtn).toBeInTheDocument();
    userEvent.click(execSearchBtn);

    await waitFor(() => {
      expect(alert).toHaveBeenCalled();
      expect(alert).toBeCalledWith('Sorry, we haven\'t found any recipes for these filters.');
    });
    global.alert.mockReset();
  });
  it('test the alert by firstletter', () => {
    global.alert = jest.fn();
    renderWithRouterAndRedux(<App />, { initialEntries: [pathDrinks] });

    const searchTopBtn = screen.getByTestId(btnSearch);
    userEvent.click(searchTopBtn);

    const firstLetterSearchRadio = screen.getByTestId('first-letter-search-radio');
    expect(firstLetterSearchRadio).toBeInTheDocument();
    userEvent.click(firstLetterSearchRadio);

    const searchInput = screen.getByTestId(inputSearch);
    userEvent.type(searchInput, 'chicken');

    const execSearchBtn = screen.getByTestId(execSearchButton);
    userEvent.click(execSearchBtn);

    expect(alert).toHaveBeenCalled();
    expect(alert).toBeCalledWith('Your search must have only 1 (one) character');
    global.alert.mockReset();
  });
});

describe('Test the searchbar on drinks page', () => {
  beforeEach(() => {
    cleanup();
    jest.restoreAllMocks();
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(drinkCategories) // aqui é o fetch de categorias
        .mockResolvedValueOnce(drinkCategories)
        .mockResolvedValue(milkDrinks), // aqui é o fetch de busca de comidas/bebidas
    });
  });
  it('test searching by name', async () => {
    initialState.drinks.drinksToRender = mockInitialDrinks;
    initialState.user.isSearchVisible = true;
    renderWithRouterAndRedux(<App />, { initialState, initialEntries: [pathDrinks] });

    const searchInput = screen.getByTestId(inputSearch);
    userEvent.type(searchInput, 'milk');
    expect(searchInput).toHaveValue('milk');

    const ingredientSearchRadio = screen.getByTestId(ingredientSearchRadioText);
    expect(ingredientSearchRadio).toBeInTheDocument();
    userEvent.click(ingredientSearchRadio);

    const execSearchBtn = screen.getByTestId(execSearchButton);
    expect(execSearchBtn).toBeInTheDocument();
    userEvent.click(execSearchBtn);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
      const zeroCardName = screen.getByTestId('0-card-name');
      expect(zeroCardName).toBeInTheDocument();
      expect(zeroCardName).toHaveTextContent(/151 Florida Bushwacker/i);
    });
  });
});
