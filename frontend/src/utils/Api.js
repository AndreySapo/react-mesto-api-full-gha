class Api {
  constructor({ link, cohort, token }) {
    // this._url = link + cohort;
    this._url = link;
    this._headers = {
      headers: {
        // authorization: token
      }
    }
  }

  _getResponseData(response) {
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json()
  }

  // Получаем юзера
  getUser({ token }) {
    this._headers.headers.Authorization = `Bearer ${token}`;

    return fetch(this._url + '/users/me', this._headers)
      .then(response => {
        return this._getResponseData(response)
      }
      )
  }

  // Получаем начальные карточки
  getCardList({ token }) {
    return fetch(this._url + '/cards', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => {
        return this._getResponseData(response);
      })
  }

  // устанавливаем новые данные юзера
  setUserInfo({ name, about }) {
    // Собираем новый Headers
    const headerForSetUserName = Object.assign({}, this._headers);
    headerForSetUserName.headers[`Content-Type`] = 'application/json';
    headerForSetUserName.method = 'PATCH';
    headerForSetUserName.body = JSON.stringify(
      {
        name,
        about
      }
    )

    return fetch(
      this._url + '/users/me',
      headerForSetUserName
    )
      .then(response => {
        return this._getResponseData(response);
      })
  }

  // Добавляем новую карточку
  addNewCard(item) {
    // Собираем новый Headers
    const headerForAddNewCard = Object.assign({}, this._headers);
    headerForAddNewCard.headers[`Content-Type`] = 'application/json';
    headerForAddNewCard.method = 'POST';
    headerForAddNewCard.body = JSON.stringify(
      {
        name: item.name,
        link: item.link
      }
    )
    // console.log({ item }, { headerForAddNewCard })

    return fetch(
      this._url + '/cards',
      headerForAddNewCard
    )
      .then(response => {
        return this._getResponseData(response)
      })
  }

  deleteCard(cardId) {
    // Собираем новый Headers
    const headerForDeleteCard = Object.assign({}, this._headers);
    headerForDeleteCard.method = 'DELETE';
    return fetch(
      this._url + '/cards/' + cardId,
      headerForDeleteCard
    )
      .then(response => {
        return this._getResponseData(response);
      })
  }

  _like(cardID) {
    // Собираем новый Headers
    const headerForToggleLike = Object.assign({}, this._headers);
    headerForToggleLike.method = 'PUT';

    return fetch(
      this._url + `/cards/${cardID}/likes`,
      headerForToggleLike,
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(`Ошибка: ${response.status}`);
      })
      .then((result) => {
        return result
      })
  }

  _dislike(cardID) {
    // Собираем новый Headers
    const headerForToggleLike = Object.assign({}, this._headers);
    headerForToggleLike.method = 'DELETE';

    return fetch(
      this._url + `/cards/${cardID}/likes`,
      headerForToggleLike,
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(`Ошибка: ${response.status}`);
      })
      .then((result) => {
        return result
      })
  }

  changeLikeCardStatus(cardID, isLiked) {
    if (isLiked === true) {
      return this._like(cardID)
    } else {
      return this._dislike(cardID)
    }
  }

  setAvatar(avatar) {
    const headerForSetAvatar = Object.assign({}, this._headers);
    headerForSetAvatar.headers[`Content-Type`] = 'application/json';
    headerForSetAvatar.method = 'PATCH';
    headerForSetAvatar.body = JSON.stringify(
      {
        avatar: avatar
      }
    )

    return fetch(
      this._url + '/users/me/avatar',
      headerForSetAvatar
    )
      .then(response => {
        return this._getResponseData(response);
      })
  }
}

export const exampleAPI = new Api({
  link: 'https://api.mesto.andreysapo.nomoredomains.work',
  // link: 'https://mesto.nomoreparties.co/v1/',
  // cohort: 'cohort-54',
  // token: '05145e33-315e-4591-bbb6-f1880e215d8f'
})