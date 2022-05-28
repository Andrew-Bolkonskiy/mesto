import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupWithConfirmation = document.querySelector('.popup_confirm');
  }

  setEventListeners(deleteCard) {
    super.setEventListeners();
    this._handleButtonSubmit = deleteCard;
    this._popupWithConfirmation.addEventListener('click', this._handleButtonSubmit);
  }

  close() {
    super.close();
    this._popupWithConfirmation.removeEventListener('click', this._handleButtonSubmit);
  }
}