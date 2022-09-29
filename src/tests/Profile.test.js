import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import {
  mockControlCheckboxes,
  mockDoneRecipes,
  mockDrinksToken,
  mockFavoriteRecipes,
  mockInProgressRecipes,
  mockMealsToken,
  mockUser,
} from './mocks/mockLocalStorage';

describe('Tests the profile page', () => {
  const pahtProfile = '/profile';
  beforeEach(cleanup);
  it('Test rendering and initial values', () => {
    localStorage.setItem('user', JSON.stringify(mockUser));

    renderWithRouterAndRedux(<App />, { initialEntries: [pahtProfile] });

    const profileFavoriteBtn = screen.getByTestId('profile-favorite-btn');
    const profileDoneBtn = screen.getByTestId('profile-done-btn');
    const profileLogoutBtn = screen.getByTestId('profile-logout-btn');

    expect(profileDoneBtn).toBeInTheDocument();
    expect(profileFavoriteBtn).toBeInTheDocument();
    expect(profileLogoutBtn).toBeInTheDocument();

    const profileEmail = screen.getByTestId('profile-email');
    expect(profileEmail).toBeInTheDocument();
    expect(profileEmail).toHaveTextContent('grupo20@trybe.com');
  });
  it('test the logout button button', async () => {
    localStorage.setItem('mealsToken', JSON.stringify(mockMealsToken));
    localStorage.setItem('drinksToken', JSON.stringify(mockDrinksToken));
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavoriteRecipes));
    localStorage.setItem('controlCheckboxes', JSON.stringify(mockControlCheckboxes));
    localStorage.setItem('inProgressRecipes', JSON.stringify(mockInProgressRecipes));
    localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));

    renderWithRouterAndRedux(<App />, { initialEntries: [pahtProfile] });

    const profileLogoutBtn = screen.getByTestId('profile-logout-btn');
    userEvent.click(profileLogoutBtn);

    const user = JSON.parse(localStorage.getItem('user'));
    const mealsToken = JSON.parse(localStorage.getItem('mealsToken'));
    const drinksToken = JSON.parse(localStorage.getItem('drinksToken'));
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const controlCheckboxes = JSON.parse(localStorage.getItem('controlCheckboxes'));
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

    expect(user).toEqual(null);
    expect(mealsToken).toEqual(null);
    expect(drinksToken).toEqual(null);
    expect(favoriteRecipes).toEqual(null);
    expect(controlCheckboxes).toEqual(null);
    expect(inProgressRecipes).toEqual(null);
    expect(doneRecipes).toEqual(null);

    const loginSubmitBtn = await screen.findByTestId('login-submit-btn');
    expect(loginSubmitBtn).toBeInTheDocument();
  });
  it('test the if path not taken', () => {
    localStorage.setItem('mealsToken', JSON.stringify(mockMealsToken));
    localStorage.setItem('drinksToken', JSON.stringify(mockDrinksToken));
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavoriteRecipes));
    localStorage.setItem('controlCheckboxes', JSON.stringify(mockControlCheckboxes));
    localStorage.setItem('inProgressRecipes', JSON.stringify(mockInProgressRecipes));
    localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));

    renderWithRouterAndRedux(<App />, { initialEntries: [pahtProfile] });

    const user = JSON.parse(localStorage.getItem('user'));
    expect(user).toEqual(null);
  });
});
