export default class Card {
  constructor(data, cardTemplateSelector) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardTemplateSelector;
  }

  _getCardTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    const popupImage = document.querySelector('.popup_image');
    const buttonClosepopupImage = popupImage.querySelector('.popup__close-btn');
    this._element.querySelector('.card__like-btn').addEventListener('click', () => {
      this._handleLikeButton();
    });

    this._element.querySelector('.card__del-btn').addEventListener('click', () => {
      this._handleDelButton();
    });

    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleOpenPopup();
      buttonClosepopupImage.addEventListener('click', () => {
        this._handleClosePopup();
      })
    })
  }

  _handleLikeButton(){
    this._element.querySelector('.card__like-btn').classList.toggle('card__like-btn_active');
  }

  _handleDelButton(){
    this._element.remove();
  }

  _handleOpenPopup() {
    const popupImage = document.querySelector('.popup_image');
    const bigImage = popupImage.querySelector('.popup__image');
    bigImage.src = this._image;
    popupImage.classList.add('popup_opened');
  }

  _handleClosePopup(){
    const popupImage = document.querySelector('.popup_image');
    const bigImage = popupImage.querySelector('.popup__image');
    bigImage.src = '';
    popupImage.classList.remove('popup_opened');
  }

  generateCard() {
    this._element = this._getCardTemplate();
    this._setEventListeners();
    this._element.querySelector('.card__image').src = this._image;
    this._element.querySelector('.card__title-text').textContent = this._title;
  
    return this._element;
  }
}