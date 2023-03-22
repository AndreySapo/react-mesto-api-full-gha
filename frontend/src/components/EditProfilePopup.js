import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleChangeName(event) {
    setName(event.target.value);
  }
  function handleChangeDescription(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    // Запрещаем браузеру переходить по адресу формы
    event.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  },[currentUser, isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name={`user`}
      title={`profile-popup`}
      headerText={'Редактировать профиль'}
      buttonSaveText={'Сохранить'}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="name"
        name="name"
        value={name||''}
        onChange={handleChangeName}
        placeholder="Имя"
        className="popup__input"
        minLength="2"
        maxLength="40"
        required />
      <span className="popup__input-error name-error" />

      <input
        type="text"
        id="job"
        name="job"
        value={description||''}
        onChange={handleChangeDescription}
        placeholder="О себе"
        className="popup__input"
        minLength="2"
        maxLength="200"
        required />
      <span className="popup__input-error job-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup