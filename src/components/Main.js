import {useEffect, useState} from 'react';
import coursor from '../images/AvatarEditCoursor.svg';
import '../index.css';
import api from '../utils/api';
import Card from './Card';

function Main({onEditAvatar, onEditProfile, onAddPlace, handleCardClick}) {

  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([data, cards]) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
        setCards(cards.map((card) => ({
          id: card._id,
          src: card.link,
          cardName: card.name,
          alt: card.name,
          likes: card.likes
        })))
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <main className="content">
  
      <section className="profile">
        <div className="profile__image">
          <img 
            className="profile__avatar" 
            src={userAvatar} 
            alt="аватар"
            onClick={onEditAvatar}/> 
          <img className="profile__edit" src={coursor} alt="кнопка редактирования"/>
        </div>
        <div className="profile__info">
          <div className="profile__title">
            <h1 className="profile__name">{userName}</h1>
            <button 
              type="button" 
              aria-label="Редактировать" 
              className="profile__edit-button"
              onClick={onEditProfile}>
            </button>
          </div>
          <p className="profile__profession">{userDescription}</p>
        </div>
        <button 
          type="button" 
          aria-label="Добавить фотокарточку" 
          className="profile__add-button"
          onClick={onAddPlace}>
        </button>
      </section> 
  
      <section className="elements">
        {
          cards.map((card) => {
            return <Card key={card.id} card={card} onCardClick={handleCardClick()}/>
          })
        }
      </section> 
  
    </main> 
  );
}

export default Main;