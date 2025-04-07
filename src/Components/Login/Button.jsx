import styles from "./Button.module.css";

function Button({ children, type, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${styles[type]}`}
      aria-label="Button"
    >
      {children}
    </button>
  );
}

export default Button;
