import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddCard}) {

  const [cardName, setCardName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleCardNameChange(e) {
    setCardName(e.target.value);
  }
  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();// Запрещаем браузеру переходить по адресу формы
  
    onAddCard({ // Передаём значения управляемых компонентов во внешний обработчик
      name: cardName,
      link,
    })
  } 

  return (
    <PopupWithForm classs='add-card' name='card-content' title='Новое место' submitText='Создать' 
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}>
        <input 
          type="text" 
          id="card-field" 
          className="popup__field popup__field_input_card" 
          onChange={handleCardNameChange}
          minLength="2" 
          maxLength="30" 
          required 
          placeholder="Название" 
          name="name" 
          defaultValue=""/>
        <span className="card-field-error popup__field-error"></span>
        <input 
          type="url" 
          id="link-field" 
          className="popup__field popup__field_input_link" 
          onChange={handleLinkChange}
          required 
          placeholder="Ссылка на картинку" 
          name="link" 
          defaultValue=""/>
        <span className="link-field-error popup__field-error"></span>
    </PopupWithForm>
  );
}
  
export default AddPlacePopup;