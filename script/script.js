const currentCards = new Array();
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

/*Объявляем функцию для добавления на страницу карточек из переданного в функцию массива */
function addCardsFromArray(items) {
  const cardsFragment = new DocumentFragment;
  items.forEach(function(el) {
    const card = document.createElement('article');
    card.classList.add('card');
  
    const cardDelButton = document.createElement('button');
    cardDelButton.classList.add('card__del-btn');
    cardDelButton.setAttribute("type", "button");
    cardDelButton.setAttribute("aria-label", "удалить");
  
    const cardImage = document.createElement('img');
    cardImage.classList.add('card__image');
  
    const cardTitle = document.createElement('div');
    cardTitle.classList.add('card__title');
  
    const cardTitleText = document.createElement('h2');
    cardTitleText.classList.add('card__title-text');
  
    const cardLikeButton = document.createElement('button');
    cardLikeButton.classList.add('card__like-btn');
    cardLikeButton.setAttribute("type", "button");
    cardLikeButton.setAttribute("aria-label", "нравится");
    
    cardTitleText.textContent = el.name;
    cardImage.src = el.link;
    cardTitle.append(cardTitleText, cardLikeButton);
    card.append(cardDelButton, cardImage, cardTitle);
    
    cardsFragment.appendChild(card);

    //устанавливаем 3 обработчика
    cardLikeButton.addEventListener('click', function(){
      cardLikeButton.classList.toggle('card__like-btn_active');
    });

    cardDelButton.addEventListener('click', function(){
      currentCards.forEach(function(element, index){
        if (element.name == cardDelButton.closest('.card').textContent){
            currentCards.splice(index, 1);
        }
      })
      cardDelButton.closest('.card').remove();
    })

    cardImage.addEventListener('click', function(){
      const popupImage = document.querySelector('.popup_image');
      const bigImage = popupImage.querySelector('.popup__image')
      const bigImageDescription = popupImage.querySelector('.popup__image-description');
      bigImage.src = el.link;
      bigImageDescription.textContent = el.name;
      openPopup(popupImage);
    })
  });
  return cardsFragment;
}

/* Объявляем функцию открытия попапа */
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

/* Объявляем функцию закрытия попапа */
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

const cardsContainer = document.querySelector('.cards');

/* Добавлем первоначальные карточки из заданного массива в массив текущих карточек*/
initialCards.reverse().forEach(function(el, i){
  currentCards[i] = {name:el.name, link:el.link};
})

cardsContainer.prepend(addCardsFromArray(currentCards));

/* pop-up button open-close для редактирования профиля*/
const popupEditProfile = document.querySelector('.popup_profile');
const editButton = document.querySelector('.profile__edit-btn');
const editCloseButton = popupEditProfile.querySelector('.popup__close-btn');

editButton.addEventListener('click', function() {
  openPopup(popupEditProfile);
  nameInput.value = document.querySelector('.profile__name').textContent;
  jobInput.value = document.querySelector('.profile__occupation').textContent;
});

editCloseButton.addEventListener('click', function(){
  closePopup(popupEditProfile);
});

// значения полей формы редактирования профиля и кнопка сохранить
const formElement = popupEditProfile.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input[name = name]');
const jobInput = formElement.querySelector('.popup__input[name = occupation]');

function formSubmitHandler (evt) {
  evt.preventDefault();
  document.querySelector('.profile__name').textContent = nameInput.value;
  document.querySelector('.profile__occupation').textContent = jobInput.value;
  closePopup(popupEditProfile);
}

formElement.addEventListener('submit', formSubmitHandler);

/* pop-up button open-close для добавления карточек*/
const popupAddCard = document.querySelector('.popup_place');
const addButton = document.querySelector('.profile__add-btn');
const closeAddButton = popupAddCard.querySelector('.popup__close-btn');

addButton.addEventListener('click', function() {
  openPopup(popupAddCard);
  nameInput.value = document.querySelector('.profile__name').textContent;
  jobInput.value = document.querySelector('.profile__occupation').textContent;
});

closeAddButton.addEventListener('click', function(){
  closePopup(popupAddCard)
});

//------------------------------------- создание новой карточки и кнопка сохранить-----------
const addForm = popupAddCard.querySelector('.popup__form');
const placeInput = popupAddCard.querySelector('.popup__input[name = place]');
const linkInput = popupAddCard.querySelector('.popup__input[name = link]');

function cardSubmitHandler (evt) {
  evt.preventDefault();
  currentCards.unshift({name: placeInput.value,link : linkInput.value});
  placeInput.value = '';
  linkInput.value = '';
  closePopup(popupAddCard);
  addCardsFromArray(currentCards);
  cardsContainer.innerHTML = '';
  cardsContainer.prepend(addCardsFromArray(currentCards));
}; 

addForm.addEventListener('submit', cardSubmitHandler);

/* закрытие popup с фотографией */
const popupBigImage = document.querySelector('.popup_image');
const imageCloseButton = popupBigImage.querySelector('.popup__close-btn');
const bigImage = popupBigImage.querySelector('.popup__image');
imageCloseButton.addEventListener('click', function() {
closePopup(popupBigImage);
});