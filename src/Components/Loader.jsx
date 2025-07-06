// src/Components/Loader.jsx
import "./Loader.css";

function Loader() {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="loader-circle"></div>
        <div className="loader-text">Loading...</div>
      </div>
    </div>
  );
}

export default Loader;
