import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import DecryptedText from "../TextAnimations/DecryptedText/DecryptedText";
// import "../Components/index.css";

function ToggleLeft({ onHandleToggle, isActive }) {
  console.log("ToggleLeft received onHandleToggle:", onHandleToggle);

  const navigate = useNavigate();
  return (
    <div className="toggle-panel toggle-left">
      {!isActive && (
        <>
          <div className="newCont">
            <p>
              {" "}
              <DecryptedText
                text={"Continue Without Login?"}
                animateOn="view"
                maxIterations={50}
              />
            </p>
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
          </div>
          <div className="bomb"></div>
          <div className="continue">
            <p>
              {" "}
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
          {" "}
          <DecryptedText
            text={"Hello, Welcome!"}
            animateOn="view"
            maxIterations={50}
            speed={50}
          />
        </h1>
        <p>
          <DecryptedText
            text={"Don't have an account?"}
            animateOn="view"
            maxIterations={50}
            speed={80}
          />
        </p>
        <Button
          aria-label="register"
          onClick={onHandleToggle}
          // to="/register"
          type="btnPanel"
          // className="registerBtn"
        >
          {/* <Link to="/register">Register</Link> */}
          <DecryptedText
            text={"Register"}
            animateOn="view"
            maxIterations={50}
            speed={100}
          />
        </Button>
      </div>
    </div>
  );
}

export default ToggleLeft;
