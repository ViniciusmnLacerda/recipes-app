import React from 'react';
import CategoriesButtons from '../components/CategoriesButtons';
import DrinksCards from '../components/DrinksCards';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

function Drinks() {
  return (
    <div>
      <Header pageTitle="Drinks" />
      <SearchBar />
      <CategoriesButtons />
      <DrinksCards />
      <Footer />
    </div>
  );
}

export default Drinks;