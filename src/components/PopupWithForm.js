import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { formSubmit } ) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._submitButton = this._popup.querySelector('.popup__save-btn');
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', this._handleFormSubmit);
    super.setEventListeners();
  }

  close() {
    this._popupForm.removeEventListener('submit', this._handleFormSubmit);
    this._popupForm.reset();
    super.close();
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  _handleFormSubmit = (event) => {
    event.preventDefault();
    this._formSubmit(this._getInputValues());
    this.close();
  }
}