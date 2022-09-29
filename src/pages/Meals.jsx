import React from 'react';
import CategoriesButtons from '../components/CategoriesButtons';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MealsCards from '../components/MealsCards';
import SearchBar from '../components/SearchBar';

function Meals() {
  return (
    <div>
      <Header pageTitle="Meals" />
      <SearchBar />
      <CategoriesButtons />
      <MealsCards />
      <Footer />
    </div>
  );
}

export default Meals;
