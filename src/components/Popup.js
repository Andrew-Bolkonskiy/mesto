export default class Popup {
  constructor (popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this._buttonClose = this._popup.querySelector('.popup__close-btn');
      this._handleEscClose = this._handleEscClose.bind(this);
      this._handleClickClose = this._handleClickClose.bind(this);
      this.close = this.close.bind(this);
      this.open = this.open.bind(this);
  }

  open() {
      this._popup.classList.add('popup_opened');
      document.addEventListener('keyup',this._handleEscClose);
  }

  close() {
      this._popup.classList.remove('popup_opened');
      document.removeEventListener('keyup', this._handleEscClose);
  }

  _handleEscClose(evt) {
      if (evt.key === 'Escape') {
          this.close();
      }
  }

  _handleClickClose(evt) {
      if (evt.target.classList.contains('popup_opened')) {
          this.close();
      }
  }

  setEventListeners(){
    this._buttonClose.addEventListener('click', this.close);
    this._popup.addEventListener('click', this._handleClickClose);
  }
}