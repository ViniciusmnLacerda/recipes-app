import clipboardCopy from 'clipboard-copy';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import TypeButtons from '../components/TypeButtons';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [isLinkCopied, setIsLinkCopied] = React.useState(false);
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const { recipeTypeFilter } = useSelector((state) => state.user);

  const handleShare = (type, id) => {
    if (type === 'drink') {
      clipboardCopy(`http://localhost:3000/drinks/${id}`);
    } else {
      clipboardCopy(`http://localhost:3000/meals/${id}`);
    }

    setIsLinkCopied(true);
    const threeSeconds = 3000;
    setTimeout(() => {
      setIsLinkCopied(false);
    }, threeSeconds);
  };

  return (
    <>
      <Header pageTitle="Done Recipes" searchVisible={ false } />
      <TypeButtons />
      {isLinkCopied && (<p>Link copied!</p>)}
      <div className="done-recipes-container">
        {doneRecipes !== null && (
          doneRecipes
            .filter((recipe) => {
              switch (recipeTypeFilter) {
              case 'Meals':
                return recipe.type === 'meal';
              case 'Drinks':
                return recipe.type === 'drink';
              default:
                return true;
              }
            })
            .map((recipe, index) => (
              <div key={ index } className="done-recipe-card">
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    width="250px"
                    alt={ recipe.name }
                  />
                </Link>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {recipe.type === 'meal'
                    ? `${recipe.nationality} - ${recipe.category}`
                    : `${recipe.alcoholicOrNot}`}
                </p>
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
                </Link>
                <p data-testid={ `${index}-horizontal-done-date` }>
                  {recipe.doneDate}
                </p>
                {recipe.type === 'meal' && (
                  <div className="done-recipe-card-tags">
                    {recipe.tags.map(
                      (tag, tIndex) => tIndex < 2 && (
                        <span
                          key={ `${tag}-${tIndex}` }
                          data-testid={ `${index}-${tag}-horizontal-tag` }
                        >
                          {`${tag} `}
                        </span>
                      ),
                    )}
                  </div>
                )}
                <input 
                  type="image"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => handleShare(recipe.type, recipe.id) }
                  src={ shareIcon }
                  alt="share icon"
                />
              </div>
            ))
          )}
      </div>
      <Footer />
    </>
  );
}

export default DoneRecipes;
