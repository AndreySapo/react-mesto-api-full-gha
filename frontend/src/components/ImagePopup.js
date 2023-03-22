function ImagePopup(props) {
  const card = props.card;
  return (
    <div className={`popup img-zoom ${props.card.link ? 'popup_opened' : ''}`}>
      <figure className="img-zoom__container">
        <img className="img-zoom__img" src={`${card.link}`} alt={`${card.name}`} />
        <figcaption className="img-zoom__caption">{`${card.name}`}</figcaption>
        <button
          type="button"
          aria-label="Кнопка закрыть"
          className="popup__button-close"
          onClick={props.onClose}
        >
        </button>
      </figure>
    </div>
  );
}

export default ImagePopup