import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const [user, setUser] = useState({ email: '' });
  const history = useHistory();
  useEffect(() => {
    const userRecovered = JSON.parse(localStorage.getItem('user'));
    if (userRecovered !== null && userRecovered) {
      setUser(userRecovered);
    }
  }, []);

  const handleClick = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('drinksToken');
    localStorage.removeItem('controlCheckboxes');
    localStorage.removeItem('inProgressRecipes');
    localStorage.removeItem('doneRecipes');
    history.push('/');
  };

  return (
    <>
      <Header pageTitle="Profile" searchVisible={ false } />
      <p
        data-testid="profile-email"
      >
        {user.email}
      </p>
      <button
        type="button"
        data-testid="profile-favorite-btn"
      >
        <Link to="/favorite-recipes">
          Favorite Recipes
        </Link>
      </button>
      <button
        data-testid="profile-done-btn"
        type="button"
      >
        <Link
          to="/done-recipes"
        >
          Done Recipes
        </Link>
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ handleClick }
      >
        Logout
      </button>
      <Footer />
    </>
  );
}

export default Profile;
