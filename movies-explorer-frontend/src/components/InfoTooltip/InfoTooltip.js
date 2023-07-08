import successIcon from "../../images/SuccessIcon.svg";
import unsuccessIcon from "../../images/UnsuccessIcon.svg";
import "./InfoTooltip.css";

function InfoTooltip({
  onClose,
  isConfigTooltip: { isOpen, isSuccess, message },
}) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          onClick={onClose}
          className="popup__close"
          type="button"
          aria-label="Закрыть"
        />
        <img
          src={isSuccess ? successIcon : unsuccessIcon}
          alt={message}
          className="popup__signup-icon"
        />
        <h3 className="popup__signup">{message}</h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
