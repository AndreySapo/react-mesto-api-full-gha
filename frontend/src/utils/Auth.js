class Auth {
  constructor() {
    this._url = 'http://localhost:3000';
    this._singUpEndPoint = '/signup';
    this._singInEndPoint = '/signin';
    this._validationEndPoint = '/users/me';
  }

  _getResponseData(response) {
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json()
  }

  signIn({ email, password }) {
    return fetch(this._url + this._singInEndPoint, {
      headers: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify(
        {
          "email": `${email}`,
          "password": `${password}`
        }
      )
    })
      .then(response => {
        return this._getResponseData(response);
      })
  }

  signUp({ email, password }) {
    return fetch(this._url + this._singUpEndPoint, {
      headers: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify(
        {
          "email": `${email}`,
          "password": `${password}`
        }
      )
    })
      .then(response => {
        return this._getResponseData(response);
      })
  }

  checkToken({ token }) {
    return fetch(this._url + this._validationEndPoint,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        method: 'GET',
      }
    )
      .then(response => {
        return this._getResponseData(response);
      })
  }
}

export const exampleAuth = new Auth;