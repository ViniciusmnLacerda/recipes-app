import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../redux/actions';

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [isEnterDisabled, setIsEnterDisabled] = useState(true);
  const dispatch = useDispatch();

  const history = useHistory();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  useEffect(() => {
    const passwordMinLength = 6;
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isLoginValid = [
      emailRegex.test(user.email),
      user.password.length > passwordMinLength,
    ].every(Boolean);
    if (isLoginValid) { setIsEnterDisabled(false); }
  }, [user]);

  const setDoneRecipes = () => {
    const recoveredDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (recoveredDoneRecipes === null) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify(recoveredDoneRecipes));
    }
  };

  const setFavoriteRecipes = () => {
    const recoveredFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (recoveredFavoriteRecipes === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify(recoveredFavoriteRecipes));
    }
  };

  const setInProgressRecipes = () => {
    const recoveredInProgressRecipes = JSON
      .parse(localStorage.getItem('inProgressRecipes'));
    if (recoveredInProgressRecipes === null) {
      localStorage
        .setItem('inProgressRecipes', JSON.stringify({}));
    } else {
      localStorage
        .setItem('inProgressRecipes', JSON.stringify(recoveredInProgressRecipes));
    }
  };

  const handleClick = () => {
    const userEmail = { email: user.email };
    localStorage.setItem('user', JSON.stringify(userEmail));
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('drinksToken', JSON.stringify(1));
    dispatch(login(user.email));
    setDoneRecipes();
    setFavoriteRecipes();
    setInProgressRecipes();
    history.push('/meals');
  };

  return (
    <div>
      <form>
        <label htmlFor="email">
          <input
            data-testid="email-input"
            type="email"
            value={ user.email }
            onChange={ (event) => handleChange(event) }
            id="email"
            name="email"
          />
        </label>
        <label htmlFor="password">
          <input
            data-testid="password-input"
            type="password"
            value={ user.password }
            onChange={ (event) => handleChange(event) }
            id="password"
            name="password"
          />
        </label>
        <button
          data-testid="login-submit-btn"
          type="button"
          disabled={ isEnterDisabled }
          onClick={ handleClick }
        >
          ENTER
        </button>
      </form>
    </div>
  );
}

export default Login;
