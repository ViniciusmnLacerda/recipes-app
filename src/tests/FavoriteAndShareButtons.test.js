import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import drinks from '../../cypress/mocks/drinks';
import meals from '../../cypress/mocks/meals';
import oneDrink from '../../cypress/mocks/oneDrink';
import oneMeal from '../../cypress/mocks/oneMeal';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import initialState from './mocks/mockInitialState';
import { mockDoneRecipes, mockFavoriteRecipes } from './mocks/mockLocalStorage';

const imageFavorited = 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg';
const favoriteBTN = 'favorite-btn';

describe('Test the FavoriteAndShareButtons component', () => {
  describe('favorite and share buttons on meals page', () => {
    const pathSpicyArrabiata = '/meals/52771';
    beforeEach(() => {
      cleanup();
      jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValueOnce(oneMeal)
          .mockResolvedValueOnce(drinks)
          .mockResolvedValue(oneMeal),
      });
    });
    jest.setTimeout(7000);
    it('Test the share button', async () => {
      Object.assign(window.navigator, {
        clipboard: {
          writeText: jest.fn().mockImplementation(() => Promise.resolve()),
        },
      });
      renderWithRouterAndRedux(
        <App />,
        { initialState, initialEntries: [pathSpicyArrabiata] },
      );
      const shareBtn = screen.getByTestId('share-btn');
      expect(shareBtn).toBeInTheDocument();
      userEvent.click(shareBtn);
      expect(window.navigator.clipboard.writeText)
        .toHaveBeenCalled();
      expect(window.navigator.clipboard.writeText)
        .toHaveBeenCalledWith('http://localhost/');
      const linkCopied = await screen.findByText(/link copied!/i);
      expect(linkCopied).toBeInTheDocument();
      await waitFor(() => {
        expect(linkCopied).not.toBeInTheDocument();
      }, { timeout: 6000 });
    });
    it('test the favorite button with empty local storage', async () => {
      renderWithRouterAndRedux(
        <App />,
        { initialState, initialEntries: [pathSpicyArrabiata] },
      );
      const favoriteBtn = screen.getByTestId(favoriteBTN);
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      expect(favoriteBtn).toBeInTheDocument();
      expect(favoriteBtn).toHaveAttribute('src', 'whiteHeartIcon.svg');
      expect(favoriteRecipes).toEqual(null);
      userEvent.click(favoriteBtn);
      const favoriteRecipes2 = JSON.parse(localStorage.getItem('favoriteRecipes'));
      expect(favoriteBtn).toHaveAttribute('src', 'blackHeartIcon.svg');
      expect(favoriteRecipes2).toEqual([{
        id: '52771',
        type: 'meal',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      }]);
      userEvent.click(favoriteBtn);
      const favoriteRecipes3 = JSON.parse(localStorage.getItem('favoriteRecipes'));
      expect(favoriteRecipes3).toEqual([]);
    });
    it('teste the local storage not empty', () => {
      localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavoriteRecipes));
      renderWithRouterAndRedux(
        <App />,
        { initialState, initialEntries: [pathSpicyArrabiata] },
      );
      const favoriteBtn = screen.getByTestId(favoriteBTN);
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      expect(favoriteBtn).toBeInTheDocument();
      expect(favoriteBtn).toHaveAttribute('src', 'whiteHeartIcon.svg');
      expect(favoriteRecipes).toEqual([{
        alcoholicOrNot: '',
        category: 'Seafood',
        id: '53065',
        image: imageFavorited,
        name: 'Sushi',
        nationality: 'Japanese',
        type: 'meal',
      }]);
      userEvent.click(favoriteBtn);
      const favoriteRecipes2 = JSON.parse(localStorage.getItem('favoriteRecipes'));
      expect(favoriteBtn).toHaveAttribute('src', 'blackHeartIcon.svg');
      expect(favoriteRecipes2).toEqual([{
        alcoholicOrNot: '',
        category: 'Seafood',
        id: '53065',
        image: imageFavorited,
        name: 'Sushi',
        nationality: 'Japanese',
        type: 'meal',
      },
      {
        id: '52771',
        type: 'meal',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      }]);
      userEvent.click(favoriteBtn);
      const favoriteRecipes3 = JSON.parse(localStorage.getItem('favoriteRecipes'));
      expect(favoriteRecipes3).toEqual([{
        alcoholicOrNot: '',
        category: 'Seafood',
        id: '53065',
        image: imageFavorited,
        name: 'Sushi',
        nationality: 'Japanese',
        type: 'meal',
      }]);
    });
  });
});

describe('test the favorite button on drinks page', () => {
  const aquamarine = '/drinks/178319';
  beforeEach(() => {
    cleanup();
    localStorage.clear();
    jest.restoreAllMocks();
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(meals)
        .mockResolvedValueOnce(oneDrink)
        .mockResolvedValue(meals),
    });
  });
  it('test the favorite button with empty local storage', () => {
    renderWithRouterAndRedux(
      <App />,
      { initialState, initialEntries: [aquamarine] },
    );
    const favoriteBtn = screen.getByTestId(favoriteBTN);
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteRecipes).toEqual(null);
    userEvent.click(favoriteBtn);
    const favoriteRecipes2 = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteRecipes2).toEqual([{
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    }]);
  });
  it('test the local storage not empty', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavoriteRecipes));
    renderWithRouterAndRedux(
      <App />,
      { initialState, initialEntries: [aquamarine] },
    );
    const favoriteBtn = screen.getByTestId(favoriteBTN);
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteRecipes).toEqual([
      {
        alcoholicOrNot: '',
        category: 'Seafood',
        id: '53065',
        image: imageFavorited,
        name: 'Sushi',
        nationality: 'Japanese',
        type: 'meal',
      },
    ]);
    userEvent.click(favoriteBtn);
    const favoriteRecipes2 = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteRecipes2).toEqual([
      {
        alcoholicOrNot: '',
        category: 'Seafood',
        id: '53065',
        image: imageFavorited,
        name: 'Sushi',
        nationality: 'Japanese',
        type: 'meal',
      },
      {
        id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      },
    ]);
  });
  it('test the start recipe button', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));
    renderWithRouterAndRedux(
      <App />,
      { initialState, initialEntries: [aquamarine] },
    );

    screen.debug();
  });
});
