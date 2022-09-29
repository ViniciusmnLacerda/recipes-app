import { cleanup } from '@testing-library/react';
import React from 'react';
import oneDrink from '../../cypress/mocks/oneDrink';
import oneMeal from '../../cypress/mocks/oneMeal';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import initialState from './mocks/mockInitialState';

describe('Test the Ingredients component', () => {
  const pathSpicyArrabiata = '/meals/52771/in-progress';
  beforeEach(() => {
    cleanup();
    localStorage.clear();
    jest.restoreAllMocks();
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });
  });
  it('test the checkboxes with no local storage', async () => {
    initialState.user.loading = false;

    renderWithRouterAndRedux(
      <App />,
      { initialState, initialEntries: [pathSpicyArrabiata] },
    );
  });
});

describe('Test the Ingredients component', () => {
  const pathAquamarine = '/drinks/178319/in-progress';
  beforeEach(() => {
    cleanup();
    localStorage.clear();
    jest.restoreAllMocks();
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });
  });
  it('test the checkboxes with no local storage', async () => {
    initialState.user.loading = false;

    renderWithRouterAndRedux(
      <App />,
      { initialState, initialEntries: [pathAquamarine] },
    );
  });
});
