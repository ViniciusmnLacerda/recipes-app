import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import '../styles/GoBack.css';

function GoBack() {
  const history = useHistory();
  return (
    <div className="goback">
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
