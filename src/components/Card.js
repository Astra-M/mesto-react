function Card (props) {

  function handleClick() {
    props.cardClick(props.card);
    }
  
  return (
      <li className="place-card">
        <img className="place-card__photo"
          src={props.card.link}
          alt={props.card.title}
          onClick={handleClick}/>
        <div className="place-card__text">
          <h3 className="place-card__title">{props.card.title}</h3>
            <div className="place-card__info">
              <button type="button" className="like-btn"></button>
              <span className="like-count">{props.card.likes.length}</span>
            </div>
        </div>
        <button type="button" className="delete-btn"></button>
      </li>
  )
}
export default Card;
