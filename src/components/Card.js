export default class Card {
  constructor (data, cardTemplate, handleCardClick) {
      this._name = data.name;
      this._link = data.link;
      this._cardTemplate = cardTemplate;
      this._handleCardClick = handleCardClick;
  }

  _getTemplate = () => {
      const cardElement = this._cardTemplate.querySelector('.card').cloneNode(true);
      return  cardElement;
  }

  _setEventListeners = () => {
      this._element.querySelector('.card__image').addEventListener('click', () => {
          this._handleCardClick(this._name, this._link)
      });
      this._element.querySelector('.card__like-btn').addEventListener('click', this._likeCard);
      this._element.querySelector('.card__del-btn').addEventListener('click', this._removeCard);
  }

  _likeCard = (evt) => {
      evt.target.classList.toggle('card__like-btn_active');
  }

  _removeCard = (evt) => {
      evt.target.closest('.card').remove();
  }

  createCard = () => {
      this._element = this._getTemplate();
      this._setEventListeners();

      this._image = this._element.querySelector('.card__image');
      this._image.src = this._link;
      this._image.alt = this._name;
      this._element.querySelector('.card__title-text').textContent = this._name;

      return this._element;
  }
}