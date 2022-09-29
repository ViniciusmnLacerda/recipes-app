import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

function Footer() {
  const { location: { pathname } } = useHistory()
  return (
    <footer data-testid="footer">
      <button
        className={pathname.includes('drinks') ? "selected" : undefined}
        type="button"
      >
        <Link to="/drinks">
          <img
            alt="drink img"
            src={ drinkIcon }
            data-testid="drinks-bottom-btn"
          />
        </Link>
      </button>
      <button
        className={pathname.includes('meals') ? "selected" : undefined}
        type="button"
      >
        <Link to="/meals">
          <img
            alt="drink img"
            src={ mealIcon }
            data-testid="meals-bottom-btn"
          />
        </Link>
      </button>
    </footer>
  );
}

export default Footer;
