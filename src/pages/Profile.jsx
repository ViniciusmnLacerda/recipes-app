import React, { useEffect, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Profile.css';

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
      <Header pageTitle="Profile" searchVisible={false} />
      <main className="profile-container">
        <div className="profile-card">
          <div className="user-email">
            <AiOutlineUser />
            <p
              data-testid="profile-email"
            >
              {user.email}
            </p>
          </div>
          <div className="profile-buttons">
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
              onClick={handleClick}
            >
              Logout
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Profile;
