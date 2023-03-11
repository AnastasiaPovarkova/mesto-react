import {useState, useEffect } from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Footer from './Footer';

import api from '../utils/api';
import {UserContext} from '../contexts/CurrentUserContext';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
      api.getInitialCards()
        .then((cards) => {
          setCards(cards);
        })
        .catch(err => console.log(err));
    }, []);

  function closeAllPopups () {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id); //поставлен ли лайк
    if (isLiked) {
      api.unlikeCard(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
       })
       .catch(err => console.log(err));
    } else {
      api.likeCard(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
       })
       .catch(err => console.log(err));
    }
  } 

  function handleDeleteCard(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter(c => c._id != card._id));
    })
    .catch(err => console.log(err));
  }

  function changeUserInfo(data) {
    api.changeUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    api.editAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleAddCard(card) {
    api.addNewCard(card)
      .then((data) => {
        console.log(data);
        setCards([data, ...cards])
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  return (
    <UserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          cards={cards}
          onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
          onEditProfile={() => setIsEditProfilePopupOpen(true)} 
          onAddPlace={() => setIsAddPlacePopupOpen(true)}
          handleCardClick={() => setSelectedCard}
          handleDeleteClick={() => handleDeleteCard}
          handleCardLike={() => handleCardLike}
        />
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar}
        /> 
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={changeUserInfo}
        />
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onAddCard={handleAddCard}
        />
        <PopupWithForm classs='delete-card' name='delete-confirmation' title='Вы уверены?' submitText='Да' onClose={closeAllPopups}/>
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        <Footer />
      </div>
    </UserContext.Provider>

  );
}

export default App;
