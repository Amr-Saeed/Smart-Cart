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
import { useForm } from "react-hook-form";
import { forwardRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "./Validation/RegSchema";
import axiosInstance from "./config/axios.config";
import toast from "react-hot-toast";

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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema(showEmail)),
  });

  const onSubmit = async (data, showEmail) => {
    console.log("data", data);
    setIsLoading(true);
    try {
      // const res = await axiosInstance.post("/api/register", data);
      // console.log("res", res);

      let res;
      if (showEmail) {
        res = await axiosInstance.post("/api/register", data);
        console.log("res", res);
      } else {
        res = await axiosInstance.post("/api/login", data);
        console.log("res", res); //in this response the api will return to me the jwt token and the user id
      }

      //Fullfilled (success)
      // const { status } = await axiosInstance.post("/api/register", data);
      // if (status === 200) {
      //   toast.success("Registration successful!", {
      //     duration: 3000,
      //     position: "top-center",
      //   });
      // }

      if (res.status === 200) {
        toast.success(
          showEmail ? "Registration successful!" : "Login successful!",
          {
            duration: 1500,
            position: "top-center",
          }
        );

        localStorage.setItem("LoggedUser", JSON.stringify(res.data)); // Save the user data in local storage
        localStorage.setItem("token", JSON.stringify(res.data.token)); // Save the token in local storage
        localStorage.setItem("userId", JSON.stringify(res.data.userId)); // Save the user ID in local storage

        setTimeout(() => {
          showEmail ? navigate("/login") : navigate("/HomePage");
        }, 2000);
      }
    } catch (error) {
      // Rejected (error)
      console.error("Error:", error);
    } finally {
      // Always executed (cleanup)
      setIsLoading(false);
    }
  };

  console.log(errors);

  const { userName, email, password } = state;
  // function handleSubmit(e) {
  //   e.preventDefault();
  //   // console.log(userName, email, password);
  //   userName === FAKE_ADMIN.userName && password !== FAKE_ADMIN.password
  //     ? alert("Admin Password is incorrect")
  //     : userName !== FAKE_ADMIN.userName && password === FAKE_ADMIN.password
  //     ? alert("Admin Username is incorrect")
  //     : userName === FAKE_ADMIN.userName && password === FAKE_ADMIN.password
  //     ? alert("Admin Login Successful")
  //     : // navigate("/DashBoard")
  //       alert("Login Successful");
  //   // navigate("/HomePage");
  // }
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="form"
      aria-label="login-form"
    >
      <UserNameInput
        userName={userName}
        handleUserName={handleUserName}
        register={register}
        errors={errors}
      />

      {showEmail && (
        <EmailInput
          email={email}
          handleEmail={handleEmail}
          register={register}
        />
      )}

      <PasswordInput
        password={password}
        handlePassword={handlePassword}
        register={register}
      />

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
      <Button isLoading={false} type="submit" aria-label="submit-button">
        {" "}
        {/* <DecryptedText
          text={`${isLoading ? "Loading..." : title}`}
          animateOn="view"
          maxIterations={50}
          speed={100}
        /> */}
        {title}
      </Button>
    </form>
  );
}
function UserNameInput({ userName, handleUserName, register, errors }) {
  return (
    <div className="input-box">
      <input
        type="text"
        placeholder="Username"
        // value={userName}
        // onChange={handleUserName}
        {...register("username")}
      />

      {/* <i className="bx bxs-user"></i> */}
      <UserIcon
        style={{ transform: "translate(-50%, -50%)" }}
        className="absolute w-[1.4rem] right-0 top-[50%] text-[var(--main-color)]"
      />
      <div>
        {errors?.username && errors.username.type === "required" && (
          <InpurErrMsg msg={"Username is required"} />
        )}
        {errors?.username && errors.username.type === "min" && (
          <InpurErrMsg msg={"Username Must Be at Least 5 chars"} />
        )}
      </div>
    </div>
  );
}

function EmailInput({ email, handleEmail, register }) {
  return (
    <div className="input-box">
      <input
        type="email"
        placeholder="Email"
        // value={email}
        // onChange={handleEmail}
        {...register("Email")}
      />
      <HiMiniEnvelope
        style={{ transform: "translate(-50%, -50%)" }}
        className="absolute w-[1.4rem] right-0 top-[50%] text-[var(--main-color)]"
      />
    </div>
  );
}

function PasswordInput({ password, handlePassword, register }) {
  return (
    <div className="input-box">
      <input
        type="password"
        placeholder="Password"
        // onChange={handlePassword}
        // value={password}
        {...register("Password")}
      />
      <HiMiniLockClosed
        style={{ transform: "translate(-50%, -50%)" }}
        className="absolute w-[1.4rem] right-0 top-[50%] text-[var(--main-color)]"
      />
    </div>
  );
}

function InpurErrMsg({ msg }) {
  return <span className="text-red-600">{msg}</span>;
}
export default Form;
