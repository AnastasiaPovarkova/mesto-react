import React from 'react';
import '../index.css';

function ImagePopup({card, onClose}) {
  return (
  <div className={`popup popup_open-card ${card && 'popup_is-opened'}`} >
    <div className="popup__element">
      <img className="popup__image" src={card.src} alt={card.alt}/>
      <button type="button" aria-label="Закрыть" className="popup__close" onClick={onClose}></button>
      <h2 className="popup__text">{card.cardName}</h2>
    </div>
  </div>
  );
}
  
export default ImagePopup;