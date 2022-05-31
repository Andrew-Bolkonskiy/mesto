const popupDeleteCard = new PopupWithSubmit('.popup_delete_card');
const cardList = new Section((item) => {
    cardList.addItem(createCard(item));
}, '.gallery')

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