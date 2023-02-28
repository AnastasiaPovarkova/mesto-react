import React from 'react';
import '../index.css';

function PopupWithForm(props) {
  return (
  <div className={`popup popup_${props.class} ${props.isOpen && 'popup_is-opened'}`}>
    <div className="popup__container">
      <button 
        type="button" 
        aria-label="Закрыть" 
        className="popup__close" 
        onClick={props.onClose}>
      </button>
      <form name={`popup__${props.name}`} id={`popup__${props.name}`} className="popup__content" noValidate>
        <h2 className="popup__title">{props.title}</h2>
        {props.children}
        <button 
          type="submit" 
          className="popup__submit" 
          name="submit" 
          defaultValue={props.submitText}>{props.submitText}
        </button>
      </form>
    </div>
  </div>
  );
}
  
export default PopupWithForm;