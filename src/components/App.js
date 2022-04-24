import React from 'react';
import api from '../utils/api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup'
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getProfile()
      .then(res => {
        setCurrentUser(res)
      })
      .catch(err => console.log(err))
  }, [])

  React.useEffect( ()=> {
    api.getCards()
      .then (res => {
        const data = res.map(item => {
          return {
            link: item.link,
            likes: item.likes,
            title: item.name,
            key: item._id,
            id: item._id,
            ownerId: item.owner._id,
          }
        })
        setCards(data)
      })
      .catch(err => console.log(err))
  }, [])

  function closeAllPopups () {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard(null)
  } 
  
  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick (cardData) {
    setSelectedCard(cardData)
  }

  function handleUpdateUser({name, about}) {
    api.editProfile(name, about)
      .then(res => {
        setCurrentUser(res);
        setIsEditProfilePopupOpen(false)
      })
      .catch(err => console.log(err))
  }

  function handleUpdateAvatar({avatar}) {
    api.editAvatar(avatar)
      .then(res => {
        setCurrentUser(res);
        setIsEditAvatarPopupOpen(false)
      })
      .catch(err => console.log(err))
  }

  function handleCardDelete (card) {
    const isOwn = (currentUser._id === card.ownerId);

    if (isOwn) {
      api.deleteCard(card.id)
        .then(
          setCards(state => state.filter (item => item.id !== card.id))
        )
        .catch(err => console.log(err))
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    const request = isLiked ? api.deleteLike(card.id) : api.addLike(card.id);
    request.then(res => {
      const newCard = {
          link: res.link,
          likes: res.likes,
          title: res.name,
          key: res._id,
          id: res._id,
          ownerId: res.owner._id,
      }
      setCards(state => state.map (item => item.id === card.id ? newCard : item))
      })
      .catch(err => console.log(err))
  }

  function handleAddPlaceSubmit({name, link}) {
    api.addCard(name,link)
      .then(res => {
        const newCard = 
          {
            link: res.link,
            likes: res.likes,
            title: res.name,
            key: res._id,
            id: res._id,
            ownerId: res.owner._id,
          }
        setCards([newCard, ...cards])
        setIsAddPlacePopupOpen(false)
      })
      .catch(err => console.log(err))
  }
  
  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <div className="page__container">
        <Header />
        
        <Main 
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick} 
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} 
                          onClose={closeAllPopups}
                          onUpdateUser={handleUpdateUser}/>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} 
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}/>

        <AddPlacePopup isOpen={isAddPlacePopupOpen} 
                        onClose={closeAllPopups}
                        onSubmitPlace={handleAddPlaceSubmit}/>

        <PopupWithForm name="delete-confirm" title="Вы уверены?" buttonTitle="Да"/>

        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
    
        <Footer />
      </div>
    </div>
  </CurrentUserContext.Provider>
  )
}
export default App;