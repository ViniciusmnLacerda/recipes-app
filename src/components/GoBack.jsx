import React from 'react';
import { useHistory } from 'react-router-dom';

function GoBack() {
  const history = useHistory();
  return (
    <button
      type="button"
      onClick={ () => history.goBack()}
    >
      Voltar
    </button>
  )
}

export default GoBack;
