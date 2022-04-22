export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  _showError(inputElement) {
    const {inputErrorClass, errorClass} = this._config;
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
  };

  _hideError(inputElement) {
    const {inputErrorClass, errorClass} = this._config;
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
  };
  
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return (!inputElement.validity.valid);
    });
  };

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
    } else {
      buttonElement.disabled = false;
    }
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, this._config);
    } else {
      this._hideError(inputElement, this._config);
    }
  };

  _setEventListeners() {
    const {inputSelector, submitButtonSelector, ...restOfConfig} = this._config;
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault;
    });
    
    const inputList = Array.from(this._formElement.querySelectorAll(inputSelector));
    const buttonElement = this._formElement.querySelector(submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement, restOfConfig);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  enableValidation() {
    const {formSelector, ...restOfConfig} = this._config;
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
      this._setEventListeners(formElement, restOfConfig);
    });
  };
};