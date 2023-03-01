import React from 'react';
import '../index.css';

function PopupWithForm({name, title, onClose, isOpen, children, classs, submitText}) {
  return (
  <div className={`popup popup_${classs} ${isOpen && 'popup_is-opened'}`}>
    <div className="popup__container">
      <button 
        type="button" 
        aria-label="Закрыть" 
        className="popup__close" 
        onClick={onClose}>
      </button>
      <form name={`popup__${name}`} id={`popup__${name}`} className="popup__content" noValidate>
        <h2 className="popup__title">{title}</h2>
        {children}
        <button 
          type="submit" 
          className="popup__submit" 
          name="submit" 
          defaultValue={submitText || 'Сохранить'}>{submitText || 'Сохранить'}
        </button>
      </form>
    </div>
  </div>
  );
}
  
export default PopupWithForm;