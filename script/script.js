/* card like button */
let likeButton = document.querySelectorAll('.card__like-btn');
for (let i = 0; i < likeButton.length; i++){
  likeButton[i].addEventListener('click', function(){
    likeButton[i].classList.toggle('card__like-btn_active');
  });
}

/* pop-up button open-close */
let popUp = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-btn');
let closeButton = document.querySelector('.popup__close-btn');

editButton.addEventListener('click', function() {
  popUp.classList.add('popup_opened');
  nameInput.value = document.querySelector('.profile__name').textContent;
  jobInput.value = document.querySelector('.profile__occupation').textContent;
});
closeButton.addEventListener('click', function() {
  popUp.classList.remove('popup_opened');
});

// значения полей формы и кнопка сохранить
let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__input[name = name]');
let jobInput = formElement.querySelector('.popup__input[name = occupation]');

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  let newName = nameInput.value;
  let newJob = jobInput.value;

  document.querySelector('.profile__name').textContent = nameInput.value;
  document.querySelector('.profile__occupation').textContent = jobInput.value;

  popUp.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);