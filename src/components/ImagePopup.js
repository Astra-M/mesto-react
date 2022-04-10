function ImagePopup () {
  return (
  <div className="popup popup_type_place-image">
  <figure className="popup__content">
    <button type="button" aria-label="закрыть окно" className="popup__close popup__close_type_place"></button>
    <img className="popup__image"/>
    <figcaption className="popup__image-caption"></figcaption>
  </figure>
  </div>
  )
}
export default ImagePopup;