import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const card = props.cardInfo;
  const onCardClick = props.onCardClick;
  const onCardLike = props.onCardLike;
  const onCardDelete = props.onCardDelete;

  const userData = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === userData._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i === userData._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `element__button-like ${isLiked && 'element__button-like_active'}`
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="element">
      <button
        type="button"
        className="element__button-zoom"
        aria-label="Кнопка просмотра изображения"
        onClick={handleClick}>
        <img
          className="element__image"
          src={`${card.link}`}
          alt={`${card.name}`} />
      </button>
      <div className="element__group">
        <h2 className="element__title">{`${card.name}`}</h2>
        <div className="element__like-group">
          <button
            type="button"
            className={`${cardLikeButtonClassName}`}
            aria-label="Кнопка лайка"
            onClick={() => { onCardLike(card) }} />
          <p className="element__counter-like">
            {
              card.likes ? `${card.likes.length}` : '0'
            }
          </p>
        </div>
      </div>
      {isOwn && <button
        type="button"
        className="element__button-trash"
        aria-label="Кнопка удаления карточки"
        onClick={() => { handleDeleteClick(card) }} />}

    </li>
  );
}

export default Card