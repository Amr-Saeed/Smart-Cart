// import styles from "./Form.module.css";
import "../Login/index.css";
import { useReducer, useState } from "react";
import Button from "./Button";
import DecryptedText from "../TextAnimations/DecryptedText/DecryptedText";
import { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "../../supabaseClient"; // ✅ Import the Supabase client
import { UserIcon } from "@heroicons/react/24/outline";
import { HiMiniEnvelope } from "react-icons/hi2";
import { HiMiniLockClosed } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "userName":
      return { ...state, userName: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    default:
      return state;
  }
}

function Form({ showEmail, title }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const { userName, email, password } = state;
  function handleSubmit(e) {
    e.preventDefault();
    // console.log(userName, email, password);
    userName === FAKE_ADMIN.userName && password !== FAKE_ADMIN.password
      ? alert("Admin Password is incorrect")
      : userName !== FAKE_ADMIN.userName && password === FAKE_ADMIN.password
      ? alert("Admin Username is incorrect")
      : userName === FAKE_ADMIN.userName && password === FAKE_ADMIN.password
      ? alert("Admin Login Successful")
      : // navigate("/DashBoard")
        alert("Login Successful");
    // navigate("/HomePage");
  }
  function handleUserName(e) {
    // setUserName(e.target.value);
    dispatch({ type: "userName", payload: e.target.value });
  }

  function handlePassword(e) {
    // setPassword(e.target.value);
    dispatch({ type: "password", payload: e.target.value });
  }

  function handleEmail(e) {
    // setEmail(e.target.value);
    dispatch({ type: "email", payload: e.target.value });
  }

  const FAKE_ADMIN = {
    userName: "admin",
    password: "4A1K",
  };
  return (
    <form onSubmit={handleSubmit} className="form" aria-label="login-form">
      <UserNameInput userName={userName} handleUserName={handleUserName} />

      {showEmail && <EmailInput email={email} handleEmail={handleEmail} />}

      <PasswordInput password={password} handlePassword={handlePassword} />

      <div className="forgot-link">
        <a href="#">
          {" "}
          <DecryptedText
            text={"Forgot Password?"}
            animateOn="view"
            maxIterations={50}
            speed={50}
          />
        </a>
      </div>
      <Button type="submit" aria-label="submit-button">
        {" "}
        <DecryptedText
          text={`${title}`}
          animateOn="view"
          maxIterations={50}
          speed={100}
        />
      </Button>
    </form>
  );
}
function UserNameInput({ userName, handleUserName }) {
  return (
    <div className="input-box">
      <input
        type="text"
        placeholder="Username"
        required
        value={userName}
        onChange={handleUserName}
      />
      {/* <i className="bx bxs-user"></i> */}
      <UserIcon
        style={{ transform: "translate(-50%, -50%)" }}
        className="absolute w-[1.4rem] right-0 top-[50%] text-[var(--main-color)]"
      />
    </div>
  );
}

function EmailInput({ email, handleEmail }) {
  return (
    <div className="input-box">
      <input
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={handleEmail}
      />
      <HiMiniEnvelope
        style={{ transform: "translate(-50%, -50%)" }}
        className="absolute w-[1.4rem] right-0 top-[50%] text-[var(--main-color)]"
      />
    </div>
  );
}

function PasswordInput({ password, handlePassword }) {
  return (
    <div className="input-box">
      <input
        type="password"
        placeholder="Password"
        required
        onChange={handlePassword}
        value={password}
      />
      <HiMiniLockClosed
        style={{ transform: "translate(-50%, -50%)" }}
        className="absolute w-[1.4rem] right-0 top-[50%] text-[var(--main-color)]"
      />
    </div>
  );
}
export default Form;
