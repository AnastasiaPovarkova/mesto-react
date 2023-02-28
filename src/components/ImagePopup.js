import React from 'react';
import '../index.css';

function ImagePopup(props) {
  return (
  <div className={`popup popup_open-card ${props.card && 'popup_is-opened'}`} >
    <div className="popup__element">
      <img className="popup__image" src={props.card.src} alt={props.card.alt}/>
      <button type="button" aria-label="Закрыть" className="popup__close" onClick={props.onClose}></button>
      <h2 className="popup__text">{props.card.cardName}</h2>
    </div>
  </div>
  );
}
  
export default ImagePopup;