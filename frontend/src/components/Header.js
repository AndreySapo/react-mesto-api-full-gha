import logo from '../images/logo_white.svg';
import { Route, Routes, Link } from 'react-router-dom';

function Header({ email, exitClick }) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      <Routes>
        <Route path='/signin' element={
          <Link to='/signup' className='header__link'>Зарегистрироваться</Link>
        } />
        <Route path='/signup' element={
          <Link to='/signin' className='header__link'>Войти</Link>
        } />
        <Route path='/' element={
          <div className='header__block'>
            <p className='header__email'>{email}</p>
            <Link to='signin' className='header__exit' onClick={exitClick}>Выйти</Link>
          </div>
        } />
      </Routes>
    </header>
  )
}

export default Header