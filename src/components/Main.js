import React from 'react';
import coursor from '../images/AvatarEditCoursor.svg';
import '../index.css';
import api from './utils/api';
import Card from './Card';

function Main(props) {

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');

  React.useEffect(() => {
    api.getUserInfo().then(data => {
     setUserName(data.name);
     setUserDescription(data.about);
     setUserAvatar(data.avatar);
    });
  });

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getInitialCards().then((data) => {
      setCards(data.map((item) => ({
        id: item._id,
        src: item.link,
        cardName: item.name,
        alt: item.name,
        likes: item.likes
      })))
    });
  }, []);

  return (
    <main className="content">
  
      <section className="profile">
        <div className="profile__image">
          <img 
            className="profile__avatar" 
            src={userAvatar} 
            alt="аватар"
            onClick={props.onEditAvatar}/> 
          <img className="profile__edit" src={coursor} alt="кнопка редактирования"/>
        </div>
        <div className="profile__info">
          <div className="profile__title">
            <h1 className="profile__name">{userName}</h1>
            <button 
              type="button" 
              aria-label="Редактировать" 
              className="profile__edit-button"
              onClick={props.onEditProfile}>
            </button>
          </div>
          <p className="profile__profession">{userDescription}</p>
        </div>
        <button 
          type="button" 
          aria-label="Добавить фотокарточку" 
          className="profile__add-button"
          onClick={props.onAddPlace}>
        </button>
      </section> 
  
      <section className="elements">
        {
          cards.map((card) => {
            return <Card key={card.id} card={card} onCardClick={props.handleCardClick()}/>
          })
        }
      </section> 
  
    </main> 
  );
}

export default Main;