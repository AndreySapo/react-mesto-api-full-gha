import React from "react";
import { Link } from "react-router-dom";

function Register({ title, buttonText, registerSubmit }) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    registerSubmit({
      email,
      password
    })
  }

  return (
    <main className="container">
      <form className="register" name="register" onSubmit={handleSubmit}>
        <h1 className="register__title">{title}</h1>
        <ul className="register__inputs">
          <li className="register__element">
            <input
              className="register__input"
              placeholder="Email"
              type="email"
              value={email}
              onChange={handleChangeEmail}
              required
            />
            <span className="register__span" />
          </li>
          <li className="register__element">
            <input
              className="register__input"
              placeholder="Пароль"
              type="password"
              value={password}
              onChange={handleChangePassword}
              required
            />
            <span className="register__span" />
          </li>
        </ul>
        <button
          className="register__button"
          type="submit"
          >
          {buttonText}
        </button>
        <Link to='/signin' className="register__link">Уже зарегистрированы? Войти</Link>
      </form>
    </main>
  );
}

export default Register