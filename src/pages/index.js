import './index.css';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

import Api from '../components/Api.js';
import {
  config,
  buttonEditProfile,
  buttonEditAvatar,
  formEditProfile,
  nameInput,
  jobInput,
  buttonAddCard,
  formAddCard,
  cardTemplateSelector,
  formEditAvatar
} from '../utils/constants.js';

const validationProfile = new FormValidator(config, formEditProfile);
validationProfile.enableValidation();
const validationGallery = new FormValidator(config, formAddCard);
validationGallery.enableValidation();
const validationAvatar = new FormValidator(config, formEditAvatar);
validationAvatar.enableValidation();

const inputsProfile = new UserInfo({ nameSelector: '.profile__name', jobSelector: '.profile__occupation', avatarSelector: '.profile__image'});

const formSubmitHandler = () => {
    renderLoading('.popup_profile', true);
    api.setUserInfo(nameInput.value, jobInput.value)
        .then((res) => {
            inputsProfile.initUserInfo(res.name, res.about, res.avatar)
            renderLoading('.popup_profile', false)
        })
        .catch((err) => {
            console.log(err)
        })
    userPopup.close();
}
const submitGalleryForm = (data) => {
    renderLoading('.popup_place', true);
    api.addCard(data.name, data.link)
        .then((res) => {
            cardList.addItem(createCard(res));
            renderLoading('.popup_place', false);
        })
        .catch((err) => {
            console.log(err)
        })

    galleryPopup.close();
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-41',
    headers: {
        authorization: '2ced76a4-143d-4487-a376-b21f6af0d75e',
        'Content-Type': 'application/json'
    }
});

const imagePopup = new PopupWithImage('.popup_image')
imagePopup.setEventListeners();
const userPopup = new PopupWithForm('.popup_profile', formSubmitHandler)
userPopup.setEventListeners();
const galleryPopup = new PopupWithForm('.popup_place', submitGalleryForm)
galleryPopup.setEventListeners();

buttonEditProfile.addEventListener('click', () => {
    validationProfile.resetValidation();
    const userInfo = inputsProfile.getUserInfo();
    nameInput.value = userInfo.name;
    jobInput.value = userInfo.job;
    userPopup.open();
});

buttonAddCard.addEventListener('click', () => {
    validationGallery.resetValidation();
    galleryPopup.open()
});

const handleCardClick = (name, link) => {
    imagePopup.open(name, link);
}

const popupDeleteCard = new PopupWithConfirmation('.popup_confirm');
const cardList = new Section((item) => {
    cardList.addItem(createCard(item));
}, '.cards')

api.getInitialCards()
    .then(res => {
        cardList.render(res)
    })
    .catch((err) => {
        console.log(err)
    })

api.getUserInfo()
    .then(res => {
        inputsProfile.initUserInfo(res.name, res.about, res.avatar);
        inputsProfile.setUserId(res._id);
    })
    .catch((err) => {
        console.log(err)
    })
const removeCard = (card) => {
    return () => {

        api.deleteCard(card.returnCardId())
            .then((res) => {
                popupDeleteCard.close();
                card.removeCard();
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

function renderLoading(popupSelector, isLoading) {
    const buttonElement = document.querySelector(popupSelector).querySelector('.popup__save-btn');
    if (isLoading) {
        buttonElement.textContent = 'Сохранение...';
    } else {
        if (popupSelector === '.cards') {
            buttonElement.textContent = 'Создать';

        } else {
            buttonElement.textContent = 'Сохранить';

        }
    }
}

function createCard({ name, link, likes, owner, _id }) {
    const card = new Card({ name, link, likes, owner, _id, userId: inputsProfile.returnUserId() }, cardTemplateSelector, handleCardClick, () => {
        popupDeleteCard.setEventListeners(removeCard(card));
        popupDeleteCard.open();
    }, () => {
        api.addLike(card.returnCardId())
            .then(res => card.changeLikesCounter(res.likes.length))
    }, () => {
        api.removeLike(card.returnCardId())
            .then(res => card.changeLikesCounter(res.likes.length))
    }, );
    return card.generateCard();
}

const submitAvatarForm = (data) => {
    renderLoading('.popup_edit-avatar', true);
    api.updateAvatarImage(data.avatar_link)
        .then((res) => {
            inputsProfile.setAvatar(data);
            renderLoading('.popup_edit-avatar', false);
        })
        .catch((err) => {
            console.log(err)
        })
    popupUpdateAvatar.close();
}

const popupUpdateAvatar = new PopupWithForm('.popup_edit-avatar', submitAvatarForm);
popupUpdateAvatar.setEventListeners();

buttonEditAvatar.addEventListener('click', () => {
    validationAvatar.resetValidation();
    popupUpdateAvatar.open();
})



//Логин и пароль для нашей когорты: cohort-41 - 96eScBoG1MCkXSTAIKIfYXL2ymBZP2Ce
/* fetch('https://mesto.nomoreparties.co/v1/cohort-41/cards', {
  headers: {
    authorization: '2ced76a4-143d-4487-a376-b21f6af0d75e'
  }
})
  .then(res => console.log(res.json()))
  .then((result) => {
    console.log(result);
  }); */
  //96eScBoG1MCkXSTAIKIfYXL2ymBZP2Ce