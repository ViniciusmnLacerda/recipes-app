import { screen } from '@testing-library/react';
import React from 'react';
import Meals from '../pages/Meals';
import renderWithRouterAndRedux from './helpers/renderWith';

describe('<Meals/> renders Header, it has two buttons with images, redirects to profile on profile btn click', () => {
  it('<Meals/> renders Header correctly', async () => {
    renderWithRouterAndRedux(<Meals />);

    expect(screen.getByRole('heading')).toHaveTextContent(/Meals/i);
  });
});
