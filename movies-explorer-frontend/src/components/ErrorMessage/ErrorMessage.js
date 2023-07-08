import "./ErrorMessage.css";

const ErrorMessage = ({ message }) => {
  return (
    <section className="error">
      <p className="error__message">{message}</p>
    </section>
  );
};

export default ErrorMessage;
