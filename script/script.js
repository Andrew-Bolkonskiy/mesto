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

/* Добавлем первоначальные карточки из заданного массива в массив текущих карточек*/
initialCards.reverse().forEach(function(el, i){
  currentCards[i] = {name:el.name, link:el.link};
})

/*Объявляем функцию для добавления заданных карточек из текущего массива */
function addCards(items) {
  items.forEach(function(el) {
    const cardsContainer = document.querySelector('.cards');
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
    const cardCopy = card.cloneNode(true);
    cardsContainer.append(cardCopy);
  });
}

addCards(currentCards);


/* pop-up button open-close для редактирования профиля*/
const popUpEdit = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-btn');
let closeButton = popUpEdit.querySelector('.popup__close-btn');

editButton.addEventListener('click', function() {
  popUpEdit.classList.add('popup_opened');
  nameInput.value = document.querySelector('.profile__name').textContent;
  jobInput.value = document.querySelector('.profile__occupation').textContent;
});

closeButton.addEventListener('click', function() {
  popUpEdit.classList.remove('popup_opened');
});

// значения полей формы и кнопка сохранить
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input[name = name]');
let jobInput = formElement.querySelector('.popup__input[name = occupation]');

function formSubmitHandler (evt) {
  evt.preventDefault();

  document.querySelector('.profile__name').textContent = nameInput.value;
  document.querySelector('.profile__occupation').textContent = jobInput.value;

  popUpEdit.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);

/* pop-up button open-close для добавления карточек*/
let popUpAdd = popUpEdit.nextElementSibling;

let addButton = document.querySelector('.profile__add-btn');
let closeAddButton = popUpAdd.querySelector('.popup__close-btn');

addButton.addEventListener('click', function() {
  popUpAdd.classList.add('popup_opened');
  nameInput.value = document.querySelector('.profile__name').textContent;
  jobInput.value = document.querySelector('.profile__occupation').textContent;
});

closeAddButton.addEventListener('click', function() {
  popUpAdd.classList.remove('popup_opened');
});

// создание новой карточки и кнопка сохранить
let addForm = popUpAdd.querySelector('.popup__form');
let placeInput = popUpAdd.querySelector('.popup__input[name = place]');
let linkInput = popUpAdd.querySelector('.popup__input[name = link]');

function cardSubmitHandler (evt) {
  evt.preventDefault();

  const cardsContainer = document.querySelector('.cards');
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

  cardTitleText.textContent = placeInput.value;
  cardImage.src = linkInput.value;
  cardTitle.append(cardTitleText, cardLikeButton);
  card.append(cardDelButton, cardImage, cardTitle);
  const cardCopy = card.cloneNode(true);
  cardsContainer.prepend(cardCopy);
  currentCards.unshift({name: placeInput.value,link : linkInput.value});
  popUpAdd.classList.remove('popup_opened');
  
  placeInput.value = '';
  linkInput.value = '';

  let likeButton = cardsContainer.querySelector('.card__like-btn');
  likeButton.addEventListener('click', function(){
    likeButton.classList.toggle('card__like-btn_active');
  });
  
  /* удаление новых карточек при нажатии на кнопку */
  let delButton = document.querySelectorAll('.card__del-btn');
  for (let i = 0; i < delButton.length; i++){
    delButton[i].addEventListener('click', function(){
      deleteCard = delButton[i].closest('.card');
      deleteCard.remove();
      currentCards.splice(i, 1);
    });
  };
}; 

addForm.addEventListener('submit', cardSubmitHandler);

/* лайк при нажатии на кнопку */
let likeButton = document.querySelectorAll('.card__like-btn');
for (let i = 0; i < likeButton.length; i++){
  likeButton[i].addEventListener('click', function(){
    likeButton[i].classList.toggle('card__like-btn_active');
  });
};

/* удаление карточек при нажатии на кнопку */
let delButton = document.querySelectorAll('.card__del-btn');

for (let i = 0; i < delButton.length; i++){
  delButton[i].addEventListener('click', function(){
    deleteCard = delButton[i].closest('.card');
    deleteCard.remove();

    currentCards.forEach(function(element, index){
      if (element.name == deleteCard.textContent){
        currentCards.splice(index, 1);
      }
    })
  });
};

/* открытие popup с фотографией */
let images = document.querySelectorAll('.card__image')
for (let i = 0; i < images.length; i++){
  images[i].addEventListener('click', function(){
    let card = images[i].closest('.card');
    let textDescription = card.querySelector('.card__title-text').textContent;
    
    const imageTemplate = document.querySelector('.template').content;
    const imageElement = imageTemplate.querySelector('.gallery').cloneNode(true);
    imageElement.classList.add('gallery_active');
    imageElement.querySelector('.gallery__image').src = images[i].src;
    imageElement.querySelector('.gallery__image-description').textContent = textDescription;
    document.querySelector('.root').prepend(imageElement.cloneNode(true));
    imageElement.querySelector

    
    /* закрытие popup с фотографией */
    const closeGalleryButton = document.querySelector('.gallery__close-btn');
    closeGalleryButton.addEventListener('click', function() {
    let gallery = document.querySelector('.gallery');
    gallery.classList.remove('gallery_active');
    });
  });
};