import Popup from './Popup.js'
export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, confirmHandler) {
      super(popupSelector);
      this._popupconfirmButton = this._popup.querySelector('.popup__save-btn');
      this._confirm = confirmHandler;
  }

  setEventListeners() {
      super.setEventListeners();
      this._popup.addEventListener('submit', (event) => {
        event.preventDefault();
        this._confirm(this.card);
      });
  }

  close() {
      super.close();
  }

  open = (currentCard) => {
    this.card = currentCard;
    super.open();
  };
}
