function PopupWithForm (props) {
  return (
    props.isOpen &&
    <article className={`popup popup_type_${props.name} popup_opened`}>
    <form name={props.name} className="popup__container">
      <button type="button" aria-label="закрыть окно" className="popup__close" onClick={props.onClose}></button>
      <div className="popup__text-container">
        <h3 className="popup__title">{props.title}</h3>
        <div className="popup__inputs">
          {props.children}
        </div>
      </div>
      <button type="submit" className="popup__save">{props.buttonTitle}</button>
    </form>
    </article>
  )
}
export default PopupWithForm;