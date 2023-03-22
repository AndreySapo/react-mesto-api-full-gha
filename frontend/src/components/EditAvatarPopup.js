import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const ref = React.useRef();

  function handleSubmit(event) {
    // Запрещаем браузеру переходить по адресу формы
    event.preventDefault();

    onUpdateAvatar(ref.current.value);

    event.target.reset();
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name={`avatar`}
      title={`avatar-edit-popup`}
      headerText={'Обновить аватар'}
      buttonSaveText={'Сохранить'}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        id="avatar"
        name="avatar"
        ref={ref}
        placeholder="Ссылка на аватар"
        className="popup__input"
        required />
      <span className="popup__input-error place-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup