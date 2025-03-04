// import "../Components/index.css";
import ToggleBox from "../Components/Login/ToggleBox";
import BoxLogIn from "../Components/Login/BoxLogIn";
import BoxRegister from "../Components/Login/BoxRegister";
import { useState, useEffect } from "react";
import ToggleLeft from "../Components/Login/ToggleLeft";
import ToggleRight from "../Components/Login/ToggleRight";
import Button from "../Components/Login/Button";
// import "../Pages/index.css";
import "../Components/Login/index.css";

function Login() {
  useEffect(() => {
    document.body.classList.add("logInBody");

    return () => {
      document.body.classList.remove("logInBody");
    };
  }, []);
  useEffect(() => {
    document.getElementById("root").style.width = "1000px";

    return () => {
      document.getElementById("root").style.width = "";
    };
  }, []);
  const [isActive, setIsActive] = useState(false);
  function handleToggle() {
    setIsActive((is) => !is);
  }

  return (
    <div className="contain">
      <div className="sadness">
        <>
          <img
            src="/sad.png"
            alt="Sad Face"
            className={`sad ${isActive ? "move-right" : ""}`}
          />
          <div className={`wire ${isActive ? "move-right" : ""}`}></div>
        </>
      </div>

      <div className={isActive ? "loginContainer active" : "loginContainer"}>
        <BoxLogIn isActive={isActive} />
        <BoxRegister isActive={isActive} />
        <ToggleBox>
          {" "}
          <ToggleLeft onHandleToggle={handleToggle} isActive={isActive} />{" "}
          <ToggleRight onHandleToggle={handleToggle} isActive={isActive} />
        </ToggleBox>
      </div>
    </div>
  );
}

export default Login;
