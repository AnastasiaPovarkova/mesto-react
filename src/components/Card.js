import React from 'react';
import '../index.css';

function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <div className="element">
        <button type="button" aria-label="Удалить" className="element__trash"></button>
        <img className="element__image" src={props.card.src} alt={props.card.alt} onClick={handleClick}/>
        <div className="element__group">
            <h2 className="element__text">{props.card.cardName}</h2>
            <div className="element__likes">
                <button type="button" aria-label="Нравится" className="element__like"></button>
                <div className="element__count">{props.card.likes.length}</div>
            </div>
        </div>
    </div>
  );
}

export default Card;