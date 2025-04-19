import styles from "./Button.module.css";

function Button({ children, type, onClick, isLoading }) {
  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${
        styles[type]
      } flex items-center justify-center gap-2.5 ${
        isLoading ? "!cursor-not-allowed !bg-[#7494ec8d]" : ""
      }`}
      aria-label="Button"
      disabled={isLoading}
    >
      {isLoading && (
        <svg
          className="mr-3 -ml-1 size-5 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}

      {isLoading ? "Processing..." : children}
    </button>
  );
}

export default Button;
