import React from 'react';
import { useHistory } from 'react-router-dom';
import CategoriesButtons from '../components/CategoriesButtons';
import DrinksCards from '../components/DrinksCards';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MealsCards from '../components/MealsCards';
import SearchBar from '../components/SearchBar';
import '../styles/Recipes.css';

function Recipes() {
  const history = useHistory();
  const path = history.location.pathname;
  return (
    <div>
      {path.includes('meals') ? (
        <>
          <Header pageTitle="Meals" />
          <SearchBar />
          <CategoriesButtons />
          <MealsCards />
          <Footer />
        </>
      ) : (
        <>
          <Header pageTitle="Drinks" />
          <SearchBar />
          <CategoriesButtons />
          <DrinksCards />
          <Footer />
        </>
      )}
    </div>
  );
}

export default Recipes;
