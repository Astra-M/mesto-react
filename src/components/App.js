import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false)

  function closeAllPopups () {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard(false)
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
  
  return (
    <div className="App">
      <div className="page">
        <div className="page__container">
          <Header />
          <Main 
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
          />
          
          <PopupWithForm name="edit-profile" title="Редактировать профиль" buttonTitle="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
            <>
            <input id="name" type="text" name="popup__name" required minLength="2" maxLength="40" className="popup__input popup__input_type_name" placeholder="введите Ваше имя"/>
            <span id="name-error" className="popup__error"></span>
            <input id="job" type="text" name="popup__job" required minLength="2" maxLength="200" className="popup__input popup__input_type_job" placeholder="введите Вашу профессию"/>
            <span id="job-error" className="popup__error"></span>
            </>
          </PopupWithForm>
            
          <PopupWithForm name="add-place" title="Новое место" buttonTitle="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
            <>
            <input id="place" type="text" name="popup__place" required minLength="2" maxLength="30" className="popup__input popup__input_type_place-name" placeholder="Название"/>
            <span id="place-error" className="popup__error"></span>
            <input id="url" type="url" name="popup__link" required className="popup__input popup__input_type_place-link" placeholder="Ссылка на картинку"/>
            <span id="url-error" className="popup__error"></span>
            </>
          </PopupWithForm>

          <PopupWithForm name="delete-confirm" title="Вы уверены?" buttonTitle="Да"/>

          <PopupWithForm name="edit-avatar" title="Обновить аватар" buttonTitle="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
            <>
            <input id="avatar" type="url" name="avatar__link" required className="popup__input popup__input_type_place-link" placeholder="Ссылка на картинку"/>
            <span id="avatar-error" className="popup__error"></span>
            </>
          </PopupWithForm>

          <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;