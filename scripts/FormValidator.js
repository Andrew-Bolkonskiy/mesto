export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector); 
  }

  _showError(inputElement) {
    const {inputErrorClass, errorClass} = this._config;
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
  };

  _hideError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this.errorClass);
  };
  
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
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
    
    this._toggleButtonState(this._inputList, this._buttonElement);
    
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement, restOfConfig);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  };

  enableValidation() {
    this._formElement.addEventListener('submit', function(event) {
      event.preventDefault();
    });
    this._setEventListeners();
  };

  resetValidation() {
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement)
    });
  }
};