import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangeName(event) {
    setName(event.target.value);
  }
  function handleChangeLink(event) {
    setLink(event.target.value);
  }

  function handleSubmit(event) {
    // Запрещаем браузеру переходить по адресу формы
    event.preventDefault();

    onAddPlace({
      name,
      link
    });

    event.target.reset();
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name={`new_post`}
      title={`new-post-popup`}
      headerText={'Новое место'}
      buttonSaveText={'Создать'}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="place"
        name="place"
        value={name}
        onChange={handleChangeName}
        placeholder="Название"
        className="popup__input"
        minLength="2"
        maxLength="30"
        required />
      <span className="popup__input-error place-error" />

      <input
        type="url"
        id="picture"
        name="picture"
        value={link}
        onChange={handleChangeLink}
        placeholder="Ссылка на картинку"
        className="popup__input"
        required />
      <span className="popup__input-error picture-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup