import Popup from './Popup.js'
export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
      super(popupSelector);
      this._popupWithSubmitDelete = this._popup.querySelector('.popup__save-btn');
  }

  setEventListeners(deleteCard) {
      super.setEventListeners();
      this._handleButtonSubmit = deleteCard;
      this._popupWithSubmitDelete.addEventListener('click', this._handleButtonSubmit);
  }

  close() {
      super.close();
      this._popupWithSubmitDelete.removeEventListener('click', this._handleButtonSubmit);
  }
}
