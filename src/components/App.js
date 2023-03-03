import {useState} from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Footer from './Footer';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  function closeAllPopups () {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  return (

    <div className="page">
      <Header />
      <Main
        onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
        onEditProfile={() => setIsEditProfilePopupOpen(true)} 
        onAddPlace={() => setIsAddPlacePopupOpen(true)}
        handleCardClick={() => setSelectedCard}
      />
      <PopupWithForm classs='edit-avatar' name='avatar-content' title='Обновить аватар' 
      onClose={closeAllPopups}
      isOpen={isEditAvatarPopupOpen}>
        <input type="url" id="avatar-field" className="popup__field popup__field_input_avatar" required placeholder="Ссылка на аватар" name="link" defaultValue=""/>
        <span className="avatar-field-error popup__field-error"></span>
      </PopupWithForm>
      <PopupWithForm classs='edit-profile' name='profile-content' title='Редактировать профиль'
      onClose={closeAllPopups}
      isOpen={isEditProfilePopupOpen}>
        <input type="text" id="name-field" className="popup__field popup__field_input_name" minLength="2" maxLength="40" required placeholder="Ваше имя" name="name" defaultValue="Жак-Ив Кусто"/>
        <span className="name-field-error popup__field-error"></span>
        <input type="text" id="profession-field" className="popup__field popup__field_input_profession" minLength="2" maxLength="200" required placeholder="Ваша профессия" name="about" defaultValue="Исследователь океана"/>
        <span className="profession-field-error popup__field-error"></span>
      </PopupWithForm>
      <PopupWithForm classs='add-card' name='card-content' title='Новое место' submitText='Создать' 
      onClose={closeAllPopups}
      isOpen={isAddPlacePopupOpen}>
        <input type="text" id="card-field" className="popup__field popup__field_input_card" minLength="2" maxLength="30" required placeholder="Название" name="name" defaultValue=""/>
        <span className="card-field-error popup__field-error"></span>
        <input type="url" id="link-field" className="popup__field popup__field_input_link" required placeholder="Ссылка на картинку" name="link" defaultValue=""/>
        <span className="link-field-error popup__field-error"></span>
      </PopupWithForm>
      <PopupWithForm classs='delete-card' name='delete-confirmation' title='Вы уверены?' submitText='Да' onClose={closeAllPopups}/>
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      <Footer />
    </div>

  );
}

export default App;
