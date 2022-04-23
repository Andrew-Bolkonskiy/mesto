import Card from './Cards.js';
import FormValidator from './FormValidator.js';

const initialCards = [
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

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',//'.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'//'popup__error_visible'
}; 

const popupEditProfile = document.querySelector('.popup_profile');
const buttonEditProfile = document.querySelector('.profile__edit-btn');
const buttonClosePopup = popupEditProfile.querySelector('.popup__close-btn');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = formEditProfile.querySelector('.popup__input[name = name]');
const jobInput = formEditProfile.querySelector('.popup__input[name = occupation]');
const popupAddCard = document.querySelector('.popup_place');
const buttonAddCard = document.querySelector('.profile__add-btn');
const closeAddButton = popupAddCard.querySelector('.popup__close-btn');
const formAddCard = popupAddCard.querySelector('.popup__form');
const placeInput = popupAddCard.querySelector('.popup__input[name = place]');
const linkInput = popupAddCard.querySelector('.popup__input[name = link]');
const popupBigImage = document.querySelector('.popup_image');
const buttonCloseImage = popupBigImage.querySelector('.popup__close-btn');
const profileNameInput = document.querySelector('.profile__name');
const profileOccupationInput = document.querySelector('.profile__occupation');
const popupList = Array.from(document.querySelectorAll('.popup'));
const cardsContainer = document.querySelector('.cards');

const profileValidation = new FormValidator(config, formEditProfile);
const newCardValidation = new FormValidator(config, formAddCard);

profileValidation.enableValidation();
newCardValidation.enableValidation();

function createCard(item) {
  const card = new Card(item, '.template', openPopup);
  const cardElement = card.generateCard();
  return cardElement;
}

function insertCard(cardElement) {
  cardsContainer.prepend(cardElement)
}

initialCards.forEach( (cardElement) => {
  insertCard(createCard(cardElement))
})

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', setKeyEscListener);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', setKeyEscListener);
};

function saveProfileForm (evt) {
  evt.preventDefault();
  profileNameInput.textContent = nameInput.value;
  profileOccupationInput.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

function saveAddCardForm (evt) {
  evt.preventDefault();
  insertCard(createCard({name: placeInput.value, link: linkInput.value}));
  closePopup(popupAddCard);
  placeInput.value = '';
  linkInput.value = '';
};

buttonEditProfile.addEventListener('click', function() {
  nameInput.value = profileNameInput.textContent;
  jobInput.value = profileOccupationInput.textContent;
  profileValidation.resetValidation();
  openPopup(popupEditProfile);
});

buttonClosePopup.addEventListener('click', function() {
  closePopup(popupEditProfile);
});

formEditProfile.addEventListener('submit', saveProfileForm);

buttonAddCard.addEventListener('click', function() {
  newCardValidation.resetValidation();
  openPopup(popupAddCard);
});

closeAddButton.addEventListener('click', function() {
  closePopup(popupAddCard);
});

formAddCard.addEventListener('submit', saveAddCardForm);

buttonCloseImage.addEventListener('click', function() {
  closePopup(popupBigImage);
});

const setOverlayListener = function(event) {
  const popupOpened = document.querySelector('.popup_opened');
  if(event.target === popupOpened) {
    closePopup(popupOpened);
  }
};

const setKeyEscListener = function(event) {
  if (event.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

popupList.forEach(popupElement => popupElement.addEventListener('mousedown', setOverlayListener));