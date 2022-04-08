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
const cardsContainer = document.querySelector('.cards');
const popupImage = document.querySelector('.popup_image');
const bigImage = popupImage.querySelector('.popup__image')
const bigImageDescription = popupImage.querySelector('.popup__image-description');
const popupEditProfile = document.querySelector('.popup_profile');
const buttonEditProfile = document.querySelector('.profile__edit-btn');
const buttonClosePopup = popupEditProfile.querySelector('.popup__close-btn');
const formElement = popupEditProfile.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input[name = name]');
const jobInput = formElement.querySelector('.popup__input[name = occupation]');
const popupAddCard = document.querySelector('.popup_place');
const buttonAddCard = document.querySelector('.profile__add-btn');
const buttonSave = popupAddCard.querySelector('.popup__save-btn');
const closeAddButton = popupAddCard.querySelector('.popup__close-btn');
const formAddCard = popupAddCard.querySelector('.popup__form');
const placeInput = popupAddCard.querySelector('.popup__input[name = place]');
const linkInput = popupAddCard.querySelector('.popup__input[name = link]');
const popupBigImage = document.querySelector('.popup_image');
const buttonCloseImage = popupBigImage.querySelector('.popup__close-btn');
const profileNameInput = document.querySelector('.profile__name');
const profileOccupationInput = document.querySelector('.profile__occupation');
const popupList = Array.from(document.querySelectorAll('.popup'));

function createCard(cardParams) {
  const cardTemplate = document.querySelector('.template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDelButton = cardElement.querySelector('.card__del-btn');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitleText = cardElement.querySelector('.card__title-text');
  const cardLikeButton = cardElement.querySelector('.card__like-btn');
  cardTitleText.textContent = cardParams.name;
  cardImage.src = cardParams.link;
  cardImage.alt = cardParams.name;
  
  cardLikeButton.addEventListener('click', function(){
    cardLikeButton.classList.toggle('card__like-btn_active');
  });

  cardDelButton.addEventListener('click', function(){
    cardDelButton.closest('.card').remove();
  });

  cardImage.addEventListener('click', function(){
    bigImage.src = cardParams.link;
    bigImage.alt = cardParams.name;
    bigImageDescription.textContent = cardParams.name;
    openPopup(popupImage);
  });
  return cardElement;
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', setKeyListener);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', setKeyListener);
};

function saveProfileForm (evt) {
  evt.preventDefault();
  profileNameInput.textContent = nameInput.value;
  profileOccupationInput.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

function saveAddCardForm (evt) {
  evt.preventDefault();
  closePopup(popupAddCard);
  cardsContainer.prepend(createCard({name: placeInput.value, link : linkInput.value}));
  placeInput.value = '';
  linkInput.value = '';
  buttonSave.disabled = true;
}; 

initialCards.forEach(function(element){
  cardsContainer.prepend(createCard(element));
});

buttonEditProfile.addEventListener('click', function() {
  nameInput.value = profileNameInput.textContent;
  jobInput.value = profileOccupationInput.textContent;
  openPopup(popupEditProfile);
});

buttonClosePopup.addEventListener('click', function(){
  closePopup(popupEditProfile);
});

formElement.addEventListener('submit', saveProfileForm);

buttonAddCard.addEventListener('click', function() {
  openPopup(popupAddCard);
});

closeAddButton.addEventListener('click', function(){
  closePopup(popupAddCard)
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

const setKeyListener = function(event) {
  if (event.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

popupList.forEach(popupElement => popupElement.addEventListener('mousedown', setOverlayListener));