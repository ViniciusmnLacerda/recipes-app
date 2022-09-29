import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      <button type="button">
        <Link to="/drinks">
          <img
            alt="drink img"
            src={ drinkIcon }
            data-testid="drinks-bottom-btn"
          />
        </Link>
      </button>
      <button type="button">
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
