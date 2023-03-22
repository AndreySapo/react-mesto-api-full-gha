import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRouteElement from './ProtectedRoute.js';
import InfoToolTip from './InfoToolTip.js';
import { exampleAPI } from '../utils/Api.js';
import { exampleAuth } from '../utils/Auth.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import '../index.css';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({
    about: "Исследователь океана",
    avatar: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    name: "Жак Ив-Кусто",
  })

  // ПР12
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [registrationState, setRegistrationState] = React.useState(false);
  const [infoToolTipText, setInfoToolTipText] = React.useState('');

  // обработчики кнопок в Main
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCloseAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: '', link: '' });
    setIsInfoToolTipOpen(false);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    exampleAPI.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards( // обновляем карточки
          (state) => state.map((c) => c._id === card._id ? newCard.data : c));
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
  }

  function handleCardDelete(card) {
    exampleAPI.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(item => item._id !== card._id));
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleUpdateUser(inputs) {
    exampleAPI.setUserInfo(inputs)
      .then((updatedUserInfo) => {
        setCurrentUser(updatedUserInfo.user);
        handleCloseAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
  }

  function handleUpdateAvatar(link) {
    exampleAPI.setAvatar(link)
      .then((updatedUserInfo) => {
        setCurrentUser(updatedUserInfo.user);
        handleCloseAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
  }

  function handleAddPlaceSubmit(cardFromInput) {
    exampleAPI.addNewCard(cardFromInput)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        handleCloseAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })

  }

  // ПР12
  // функция для логина
  // получаем лог/пасс с формы, передаем в апи, при успешном ответе сохраняем
  // токен, устанавливаем нужные значения в константы
  function loginSubmit({ email, password }) {

    exampleAuth.signIn({ email, password })
      .then(({ token }) => {
        localStorage.setItem('jwt', token);
        navigate('/', { replace: true });
        setLoggedIn(true);
        setEmail(email);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
        setIsInfoToolTipOpen(true);
        setInfoToolTipText('Что-то пошло не так! Попробуйте ещё раз.');
      })

  }

  // функция выхода из аккаунта
  // удаляем jwt, устанавливаем значение в константу, перекидываем на страницу входа
  function exitClick() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/signin', { replace: true });
  }

  // функция регистрации
  // делаем запрос. в случае успеха подказываем один попап, в случае фейла - другой попап
  function registerSubmit({ email, password }) {
    exampleAuth.signUp({ email, password })
      .then(() => {
        setIsInfoToolTipOpen(true);
        setRegistrationState(true);
        setInfoToolTipText('Вы успешно зарегистрировались!');
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
        setIsInfoToolTipOpen(true);
        setInfoToolTipText('Что-то пошло не так! Попробуйте ещё раз.');
        setRegistrationState(false);
      })
  }

  React.useEffect(() => {
    if (loggedIn) {
      const jwt = { token: localStorage.getItem('jwt') };
      Promise.all(
        [
          exampleAPI.getUser(jwt),
          exampleAPI.getCardList(jwt)
        ]
      )
        .then(([userData, cards]) => {
          setCurrentUser(userData.data);
          setCards(cards.data);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
  }, [loggedIn]);

  // ПР12

  React.useEffect(() => {
    // При открытии страницы проверяем токен. если есть - перенаправляем в /
    const jwt = { token: localStorage.getItem('jwt') };

    if (localStorage.getItem('jwt')) {
      exampleAuth.checkToken(jwt)
        .then(({ data }) => {
          setEmail(data.email);
          setLoggedIn(true);
          navigate('/', { replace: true })
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header email={email} exitClick={exitClick} />

        <Routes>
          <Route path="/signup" element={
            <Register
              title='Регистрация'
              buttonText='Зарегистрироваться'
              registerSubmit={registerSubmit}
            />
          }
          />
          <Route path="/signin" element={
            <Login
              title='Вход'
              buttonText='Войти'
              onSubmit={loginSubmit}
            />} />
          <Route path='/'
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
            }
          />
        </Routes>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={handleCloseAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={handleCloseAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />


        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={handleCloseAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          title={`confirm-popup`}
          name={`confirm`}
        />

        <ImagePopup
          card={selectedCard}
          onClose={handleCloseAllPopups}
        />

        <InfoToolTip
          isOpen={isInfoToolTipOpen}
          onClose={handleCloseAllPopups}
          state={registrationState}
          text={infoToolTipText}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
