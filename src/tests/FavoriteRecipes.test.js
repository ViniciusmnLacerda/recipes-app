import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockFavRecipes from './mocks/mockFavRecipes';

describe('Tests Favorite Recipes page', () => {
  beforeEach(cleanup);
  const pathFavRecipes = '/favorite-recipes';

  it('Test type filter butons, rendering of cards and redirects', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavRecipes));
    renderWithRouterAndRedux(<App />, { initialEntries: [pathFavRecipes] });

    const filterByAllBtn = screen.getByRole('button', { name: /All/i });
    const filterByMealsBtn = screen.getByRole('button', { name: /Meals/i });
    const filterByDrinksBtn = screen.getByRole('button', { name: /Drinks/i });

    await userEvent.click(filterByMealsBtn);
    await waitFor(() => expect(screen.getByText(/Spicy Arrabiata Penne/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText(/Aquamarine/i)).toBeNull());

    await userEvent.click(filterByDrinksBtn);
    await waitFor(() => expect(screen.queryByText(/Spicy Arrabiata Penne/i)).toBeNull());
    await waitFor(() => expect(screen.getByText(/Aquamarine/i)).toBeInTheDocument());

    await userEvent.click(filterByAllBtn);
    await waitFor(() => expect(screen.getByText(/Spicy Arrabiata Penne/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/Aquamarine/i)).toBeInTheDocument());

    expect(screen.getByText(/Italian - Vegetarian/i)).toBeInTheDocument();
    expect(screen.getByText(/Spicy Arrabiata Penne/i)).toBeInTheDocument();

    expect(screen.getByText(/Alcoholic/i)).toBeInTheDocument();
    expect(screen.getByText(/Aquamarine/i)).toBeInTheDocument();

    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });
    const shareButtonTwo = screen.getByTestId('1-horizontal-share-btn');
    await userEvent.click(shareButtonTwo);
    const clipboardTwo = 'http://localhost:3000/drinks/178319';
    expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith(clipboardTwo);

    const shareButtonOne = screen.getByTestId('0-horizontal-share-btn');
    await userEvent.click(shareButtonOne);
    const clipboardOne = 'http://localhost:3000/meals/52771';
    expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith(clipboardOne);

    const favoriteButtonTwo = screen.getByTestId('1-horizontal-favorite-btn');
    await userEvent.click(favoriteButtonTwo);
    await waitFor(() => expect(screen.queryByText(/Aquamarine/i)).toBeNull());
  });
});
