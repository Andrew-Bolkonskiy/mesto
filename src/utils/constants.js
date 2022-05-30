export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',//'.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'//'popup__error_visible'
};

export const popupEditProfile = document.querySelector('.popup_profile');
export const buttonEditProfile = document.querySelector('.profile__edit-btn');
export const formEditProfile = popupEditProfile.querySelector('.popup__form');
export const nameInput = formEditProfile.querySelector('.popup__input[name = profileName]');
export const jobInput = formEditProfile.querySelector('.popup__input[name = occupation]');
export const popupAddCard = document.querySelector('.popup_place');
export const buttonAddCard = document.querySelector('.profile__add-btn');
export const formAddCard = popupAddCard.querySelector('.popup__form');
export const cardTemplateSelector = '.template';
export const popupEditAvatar = document.querySelector('.popup_edit-avatar');
export const formEditAvatar = popupEditAvatar.querySelector('.popup__form');
export const buttonEditAvatar = document.querySelector('.profile__image-button');
export const popupConfirmDel = document.querySelector('.popup_confirm');
export const buttonDelCard = popupConfirmDel.querySelector('.popup__save-btn');