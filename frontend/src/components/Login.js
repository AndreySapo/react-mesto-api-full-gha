import React from "react";

function Login ({ title, buttonText, onSubmit }) {

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

    onSubmit({
      email,
      password
    })
  }

  return (
    <main className="container">
      <form className="login" name="login" onSubmit={handleSubmit}>
        <h1 className="login__title">{title}</h1>
        <ul className="login__inputs">
          <li className="login__element">
            <input
              className="login__input"
              placeholder="Email"
              type="email"
              value={email}
              onChange={handleChangeEmail}
              required
            />
            <span className="login__span" />
          </li>
          <li className="login__element">
            <input
              className="login__input"
              placeholder="Пароль"
              type="password"
              value={password}
              onChange={handleChangePassword}
              required
            />
            <span className="login__span" />
          </li>
        </ul>
        <button
          className="login__button"
          type="submit"
          >
          {buttonText}
        </button>
      </form>
    </main>
  );
}

export default Login