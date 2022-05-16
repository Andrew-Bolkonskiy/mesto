import './index.css';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import {
  initialCards,
  config,
  buttonEditProfile,
  formEditProfile,
  nameInput,
  jobInput,
  buttonAddCard,
  formAddCard,
  placeInput,
  linkInput,
  cardTemplateSelector
} from '../utils/constants.js';

const popupProfile = new PopupWithForm('.popup_profile', handleEditProfileFormSubmit);
const popupCard = new PopupWithForm('.popup_place', handleAddCardFormSubmit);
const popupImage = new PopupWithImage('.popup_image');
const userInfo = new UserInfo ({name:'.profile__name', occupation:'.profile__occupation'});

// Валидация двух форм
const validationAddForm = new FormValidator(config, formAddCard);
const validationProfileForm = new FormValidator(config, formEditProfile);

const section = new Section({items: initialCards, renderer: (item) => {
  section.addItem(createCard(item))
}
},'.cards');

function createCard(item){
  const card = new Card(item, cardTemplateSelector,  handleCardClick);
  const newCard = card.createCard(); 
  return newCard;
}

// Функция добавления новой карточки при сабмите формы popupCard
function handleAddCardFormSubmit() { 
  section.addItem(createCard({name: placeInput.value, link: linkInput.value}));
  validationAddForm.resetValidation();
  popupCard.close();
}

// Открытие попапа с картинкой 
function handleCardClick(link, name){
  popupImage.open(name, link);
}

function handleEditProfileFormSubmit() {
  userInfo.setUserInfo(nameInput, jobInput);
  console.log(popupProfile._handleFormSubmit);
  popupProfile.close();
}

function openPopupProfile() {
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().occupation;
  validationProfileForm.resetValidation();
  popupProfile.open();
}

function openPopupCard() {
  validationAddForm.resetValidation();
  popupCard.open();
}

validationAddForm.enableValidation();
validationProfileForm.enableValidation();

section.render();

popupProfile.setEventListeners();
popupCard.setEventListeners();
popupImage.setEventListeners();

formEditProfile.addEventListener('submit', handleEditProfileFormSubmit);
buttonEditProfile.addEventListener('click', openPopupProfile)

formAddCard.addEventListener('submit',  handleAddCardFormSubmit);
buttonAddCard.addEventListener('click', openPopupCard);