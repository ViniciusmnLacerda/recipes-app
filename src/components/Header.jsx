import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { showSearch } from '../redux/actions';
import '../styles/Header.css';

function Header(props) {
  const { pageTitle, searchVisible } = props;
  const dispatch = useDispatch();

  return (
    <header className="header-container">
      <div className="icon-header">
        <a href="https://viniciuslacerda.vercel.app/" target="_blanked">
          <img src="/chef.svg" alt="chef" />
        </a>
      </div>
      <h1
        className={pageTitle === 'Favorite Recipes' ? 'small-title' : undefined}
        id={pageTitle === 'Done Recipes' ? 'small-title' : undefined}
        data-testid="page-title"
      >
        {pageTitle}
      </h1>
      <div className="header-buttons">
        <button type="button">
          <Link to="/profile">
            <img
              alt="profile img"
              src={profileIcon}
              data-testid="profile-top-btn"
            />
          </Link>
        </button>
        {searchVisible && (
          <button
            data-testid="open-searchbar"
            type="button"
            onClick={() => dispatch(showSearch())}
          >
            <img
              alt="search img"
              src={searchIcon}
              data-testid="search-top-btn"
            />
          </button>
        )}
      </div>
    </header>
  );
}

Header.defaultProps = {
  searchVisible: true,
};

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  searchVisible: PropTypes.bool,
};

export default Header;
