import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
// import App from '../App';
import Drinks from '../pages/Drinks';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockInitialDrinks from './mocks/mockInitialDrinks';
// import mockDoneRecipes from './mocks/mockDoneRecipes';

describe('Tests Done Recipes page', () => {
  beforeEach(cleanup);
  const pathDrinkDetails = '/drinks/15997';

  it('Test type filter butons, rendering of cards and redirects', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockInitialDrinks),
    }));

    renderWithRouterAndRedux(<Drinks />, { initialEntries: [pathDrinkDetails] });

    const drinkImage = await screen.findByAltText('GG');
    const linkToDetails = await screen.findByTestId('0-card-name');

    expect(drinkImage.src).toContain('https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg');
    expect(linkToDetails).toBeInTheDocument();

    userEvent.click(linkToDetails);

    const isAlcoholic = await screen.findByRole('heading', { level: 3 });

    expect(isAlcoholic).toBeInTheDocument();
  });
});
