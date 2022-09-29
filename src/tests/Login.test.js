import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import {
  mockDoneRecipes, mockFavoriteRecipes,
  mockInProgressRecipes,
} from './mocks/mockLocalStorage';

describe('Tests Login page', () => {
  beforeEach(cleanup);
  const pathLogin = '/';
  const incorrectEmail = 'email';
  const emailLogin = 'grupo20@trybe.com';
  it('Test rendering, initial values and form', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [pathLogin] });

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginSubmitBtn = screen.getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginSubmitBtn).toBeInTheDocument();
    expect(loginSubmitBtn).toBeDisabled();

    userEvent.type(emailInput, incorrectEmail);
    expect(emailInput).toHaveValue(incorrectEmail);

    userEvent.type(passwordInput, '1234567');
    expect(passwordInput).toHaveValue('1234567');

    expect(loginSubmitBtn).toBeDisabled();

    userEvent.clear(emailInput);
    userEvent.type(emailInput, emailLogin);
    expect(emailInput).toHaveValue(emailLogin);

    expect(loginSubmitBtn).not.toBeDisabled();

    userEvent.click(loginSubmitBtn);
    const emailRecovered = JSON.parse(localStorage.getItem('user'));
    const mealsToken = JSON.parse(localStorage.getItem('mealsToken'));
    const drinksToken = JSON.parse(localStorage.getItem('drinksToken'));

    expect(emailRecovered).toEqual({ email: emailLogin });
    expect(mealsToken).toEqual(1);
    expect(drinksToken).toEqual(1);
  });
  it('test the local storage', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavoriteRecipes));
    localStorage.setItem('inProgressRecipes', JSON.stringify(mockInProgressRecipes));
    localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));

    renderWithRouterAndRedux(<App />, { initialEntries: [pathLogin] });

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginSubmitBtn = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, emailLogin);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginSubmitBtn);

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

    expect(favoriteRecipes).toEqual(mockFavoriteRecipes);
    expect(inProgressRecipes).toEqual(mockInProgressRecipes);
    expect(doneRecipes).toEqual(mockDoneRecipes);
  });
});
