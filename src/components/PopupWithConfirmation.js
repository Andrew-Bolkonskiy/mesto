import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupWithConfirmation = document.querySelector('.popup__save-btn');
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  setEventListeners(deleteCard) {
    super.setEventListeners();
    this._handleButtonSubmit = deleteCard;
    this._popupWithConfirmation.addEventListener('click', this._handleButtonSubmit);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
}

  close() {
    super.close();
    this._popupWithConfirmation.removeEventListener('click', this._handleButtonSubmit);
  }
}