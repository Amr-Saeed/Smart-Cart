import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import DecryptedText from "../TextAnimations/DecryptedText/DecryptedText";

// import "../Components/index.css";
function ToggleRight({ onHandleToggle, isActive }) {
  const navigate = useNavigate();

  return (
    <div className="toggle-panel toggle-right">
      {isActive && (
        <>
          <div className={`bomb ${isActive ? "move-right" : ""}`}></div>
          <div className="continue active">
            <p>
              <DecryptedText
                text={"Continue Without Login?"}
                animateOn="view"
                maxIterations={50}
              />
            </p>
            {/* <Link to="/HomePage"> */}
            <Button
              onClick={() => navigate("/HomePage")}
              type="btnPanel"
              aria-label="continue-without-login"
            >
              <DecryptedText
                text={"Continue"}
                animateOn="view"
                maxIterations={50}
              />
            </Button>
            {/* </Link> */}
          </div>
        </>
      )}
      <div className="toggle-content">
        <h1>
          <DecryptedText
            text={"Welcome Back!"}
            animateOn="view"
            maxIterations={50}
            speed={50}
          />
        </h1>
        <p>
          <DecryptedText
            text={"Already have an account?"}
            animateOn="view"
            maxIterations={50}
            speed={80}
          />
        </p>
        <Button
          onClick={onHandleToggle}
          type="btnPanel"
          className="login-btn"
          aria-label="login-button"
        >
          <DecryptedText
            text={"Login"}
            animateOn="view"
            maxIterations={50}
            speed={100}
          />
        </Button>
      </div>
    </div>
  );
}
export default ToggleRight;
