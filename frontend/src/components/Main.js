import React from "react";
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main(props) {

  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main>
      <section className="profile">
        <div className="profile__main">
          <div className="profile__edit-avatar" onClick={props.handleEditAvatarClick}>
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Фото Жак-Ив Кусто"
            />
          </div>

          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="profile__edit" type="button" onClick={props.handleEditProfileClick}></button>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-card" type="button" onClick={props.handleAddCardClick}></button>
      </section>

      <section className="elements">
      {props.cards.map((card) => (
          <Card 
          key={card._id} 
          card={card} 
          onClick={props.handlePopupBigImageClick} 
          onCardClick={props.onCardClick}
          onCardLike={props.handleCardLike}
          onCardDelete={props.handleCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
