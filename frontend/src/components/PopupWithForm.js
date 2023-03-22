function PopupWithForm({isOpen, onClose, name, title, headerText, buttonSaveText, onSubmit, children}) {
  return (
    <div
      className={`popup ${title} ${isOpen ? `popup_opened` : ''}`}
    >
      <div className="popup__container">
        <form
          className="popup__form"
          name={`{${name}}`}
          onSubmit={onSubmit}
        >
          <h2 className="popup__header">
            {headerText}
          </h2>

          {children}

          <button
            type="submit"
            className="popup__button-save"
          >
            {buttonSaveText}
          </button>

          <button
            type="button"
            aria-label="Кнопка закрыть"
            className="popup__button-close"
            onClick={onClose}
          >
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm