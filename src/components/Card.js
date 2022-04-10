function Card (props) {
  return (
      <li className="place-card">
        <img className="place-card__photo" style={{ backgroundImage: `url(${props.link})`}}/>
        <div className="place-card__text">
          <h3 className="place-card__title">{props.title}</h3>
            <div className="place-card__info">
              <button type="button" class="like-btn"></button>
              <span className="like-count">{props.likes}</span>
            </div>
        </div>
        <button type="button" className="delete-btn"></button>
      </li>
  )
}
export default Card;
