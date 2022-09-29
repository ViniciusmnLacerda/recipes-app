import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWith';
import Meals from '../pages/Meals';

describe('<Meals/> renders Footer, it has two buttons with images, redirects to correct pages on btn click', () => {
  it('<Meals/> renders Footer correctly', () => {
    renderWithRouterAndRedux(<Meals />);

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
