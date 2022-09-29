import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { showSearch } from '../redux/actions';

function Header(props) {
  const { pageTitle, searchVisible } = props;
  const dispatch = useDispatch();

  return (
    <header>
      <h3 data-testid="page-title">{pageTitle}</h3>
      <button type="button">
        <Link to="/profile">
          <img
            alt="profile img"
            src={ profileIcon }
            data-testid="profile-top-btn"
          />
        </Link>
      </button>
      {searchVisible && (
        <button
          data-testid="open-searchbar"
          type="button"
          onClick={ () => dispatch(showSearch()) }
        >
          <img
            alt="search img"
            src={ searchIcon }
            data-testid="search-top-btn"
          />
        </button>
      )}
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
