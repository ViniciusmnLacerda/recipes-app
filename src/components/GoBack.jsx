import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import '../styles/GoBack.css';

function GoBack() {
  const history = useHistory();
  const path = history.location.pathname;
  return (
    <div
      className={(path.includes('drinks') || path.includes('meals')) ? 'goback topgb' : 'goback'}
    >
      <button
        type="button"
        onClick={() => history.goBack()}
      >
        <AiOutlineArrowLeft />
      </button>
    </div>
  );
}

export default GoBack;
