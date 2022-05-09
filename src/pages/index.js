import Card from '../components/Cards.js';
import FormValidator from '../components/FormValidator.js';

import {
  initialCards,
  config,
  popupEditProfile,
  buttonEditProfile,
  buttonClosePopup,
  formEditProfile,
  nameInput,
  jobInput,
  popupAddCard,
  buttonAddCard,
  closeAddButton,
  formAddCard,
  placeInput,
  linkInput,
  popupBigImage,
  buttonCloseImage,
  profileNameInput,
  profileOccupationInput,
  popupList,
  cardsContainer
} from '../utils/constants.js';

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