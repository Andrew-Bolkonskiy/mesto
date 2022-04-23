export default class Card {
  constructor(data, cardTemplateSelector, openPopup) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardTemplateSelector;
    this._openPopup = openPopup;
    this._popupImage = document.querySelector('.popup_image');
    this._bigImage = this._popupImage.querySelector('.popup__image');
    this.buttonClosepopupImage = this._popupImage.querySelector('.popup__close-btn');
    this._bigImageDescritpion = this._popupImage.querySelector('.popup__image-description');
  }

  _getCardTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {

    this._element.querySelector('.card__like-btn').addEventListener('click', () => {
      this._handleLikeButton();
    });

    this._element.querySelector('.card__del-btn').addEventListener('click', () => {
      this._handleDelButton();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleOpenPopup();
    })
  }

  _handleLikeButton(){
    this._element.querySelector('.card__like-btn').classList.toggle('card__like-btn_active');
  }

  _handleDelButton(){
    this._element.remove();
  }

  _handleOpenPopup() {
    this._bigImage.src = this._image;
    this._bigImageDescritpion.textContent = this._title;
    this._openPopup(this._popupImage);
  }

  generateCard() {
    this._element = this._getCardTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitleText = this._element.querySelector('.card__title-text');
    this._cardImage.alt = this._title;
    this._cardImage.src = this._image;
    this._cardTitleText.textContent = this._title;
    this._setEventListeners();
    return this._element;
  }
}