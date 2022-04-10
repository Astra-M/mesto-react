import React from 'react';
import api from '../utils/api';
//import Card from './Card';


function Main (props) {
  
  const [ userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([])

  React.useEffect ( () => { 
    api.getProfile()
      .then ( res => {
        setUserAvatar(res.avatar);
        setUserDescription(res.about);
        setUserName(res.name)
    })
  })

  React.useEffect( ()=> {
    api.getCards()
      .then (res => {
        const data = res.map(item => {
           return {
            link: item.link,
            likes: item.likes,
            title: item.name,
            id: item._id,
          }
        })
      setCards(data)
      })
  }, [])

  return (
    <main className="content">
      <section className="user-profile">
        <div className="user-form">
          <div 
            className="user-form__avatar" 
            onClick={props.onEditAvatar}
            style={{ backgroundImage: `url(${userAvatar})` }}>
          </div>
          <div className="input">
            <div className="input__block">
              <h1 className="input__name">{userName}</h1>
              <button type="button" onClick={props.onEditProfile} className="edit-btn"></button>
            </div>
            <p className="input__job">{userDescription}</p>
          </div>
        </div>
        <button type="button" onClick={props.onAddPlace} className="add-btn"></button>        
      </section>

      <section className="places-gallery">
        <ul className="places-gallery__list">
          {          
            cards.map(item => {
              return (
                  <li className="place-card" key={item.id}>
                    <img className="place-card__photo" style={{ backgroundImage: `url(${item.link})`}}/>
                    <div className="place-card__text">
                      <h3 className="place-card__title">{item.title}</h3>
                        <div className="place-card__info">
                          <button type="button" class="like-btn"></button>
                          <span className="like-count">{item.likes}</span>
                        </div>
                    </div>
                    <button type="button" className="delete-btn"></button>
                  </li>
             )
              //<Card key={item.id} title={item.title} link={item.link} likes={item.likes} />
            })
          }  
        </ul>
      </section>
    </main>
  )
}

export default Main;
