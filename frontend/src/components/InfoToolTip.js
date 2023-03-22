import successPicture from '../images/register_success.svg';
import failPicture from '../images/register_fail.svg';

function InfoToolTip({ isOpen, onClose, state, text }) {

  return (
    <div className={`popup infotooltip ${isOpen ? `popup_opened` : ''}`}>
      <div className="popup__container">
        <div className='infotooltip__elements'>
          <img src={state ? successPicture : failPicture} alt='Ошибка!' className="infotooltip__img" />
          <p className='infotooltip__text'>{text}</p>
        </div>
        <button
          type="button"
          aria-label="Кнопка закрыть"
          className="popup__button-close"
          onClick={onClose}
        />

      </div>
    </div>
  );
}

export default InfoToolTip