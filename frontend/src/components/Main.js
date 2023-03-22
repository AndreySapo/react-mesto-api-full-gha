import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Card from './Card.js';

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const userData = React.useContext(CurrentUserContext);

  return (
    <main className="container">
      <section className="profile">

        <div className="profile__main-container">
          <div className="profile__avatar">
            <div
              className="profile__avatar-img"
              style={{ backgroundImage: `url(${userData.avatar})` }} />
            <button
              type="button"
              className="profile__avatar-edit-button"
              onClick={onEditAvatar}>
            </button>
          </div>

          <div className="profile__info">
            <div className="profile__final-container">
              <h1 className="profile__name">{`${userData.name}`}</h1>
              <button
                type="button"
                className="profile__edit-button"
                aria-label="Кнопка Редактировать профиль"
                onClick={onEditProfile}></button>
            </div>
            <p className="profile__job">{`${userData.about}`}</p>
          </div>
        </div>

        <button
          type="button"
          className="profile__add-button"
          aria-label="Кнопка добавления поста"
          onClick={onAddPlace} />
      </section>

      <section className="elements">
        <ul className="elements__grid">
          {
            cards.map((card) => {
              return (
                <Card
                  cardInfo={card}
                  key={card._id}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                />
              );
            })
          }
        </ul>
      </section>
    </main>
  );
}

export default Main