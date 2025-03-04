// import styles from "./Form.module.css";
import "../Login/index.css";
import { useReducer, useState } from "react";
import Button from "./Button";
import DecryptedText from "../TextAnimations/DecryptedText/DecryptedText";
import { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "../../supabaseClient"; // ✅ Import the Supabase client

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
  // const [userName, setUserName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const [state, dispatch] = useReducer(reducer, initialState);

  const { userName, email, password } = state;
  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   console.log("🚀 Form Submitted!"); // Add this for debugging

  //   if (!email || !password) {
  //     console.error("Email and password are required");
  //     return;
  //   }

  //   if (title === "Register") {
  //     const { data, error } = await supabase.auth.signUp({
  //       email,
  //       password,
  //     });

  //     if (error) {
  //       console.error("Register Error:", error.message);
  //     } else {
  //       console.log(
  //         "Sign Up Successful! Please check your email to confirm your account."
  //       );
  //       alert(
  //         "A confirmation email has been sent to your email. Please verify your account."
  //       );
  //     }
  //   }
  // }
  // async function handleSubmit(e) {
  //   e.preventDefault();

  //   if (!password || !userName) {
  //     console.error("Username and password are required");
  //     alert("Username and password are required");
  //     return;
  //   }

  //   if (title === "Register") {
  //     // 🟢 SIGN UP: Requires username, email, and password
  //     if (!email) {
  //       console.error("Email is required for sign up");
  //       alert("Email is required for sign up");
  //       return;
  //     }

  //     const { data, error } = await supabase.auth.signUp({
  //       email,
  //       password,
  //     });

  //     if (error) {
  //       console.error("Sign Up Error:", error.message);
  //       alert(error.message);
  //     } else {
  //       console.log("Sign Up Successful! Check your email to confirm.");

  //       // 🔹 Store username in the Supabase `profiles` table
  //       const { error: dbError } = await supabase
  //         .from("profiles")
  //         .insert([{ id: data.user.id, username: userName, email }]);

  //       if (dbError) {
  //         console.error("Error saving username:", dbError.message);
  //         alert("Error saving username");
  //       } else {
  //         alert(
  //           "A confirmation email has been sent. Please verify your account."
  //         );
  //       }
  //     }
  //   } else if (title === "Login") {
  //     // 🔵 LOGIN: Use username & password only
  //     const { data, error } = await supabase
  //       .from("profiles") // Look up email from username
  //       .select("email")
  //       .eq("username", userName)
  //       .single();

  //     if (error || !data) {
  //       console.error("User not found:", error?.message);
  //       alert("Invalid username or password");
  //       return;
  //     }

  //     const userEmail = data.email; // Get the associated email

  //     // Log in using email & password
  //     const { error: loginError } = await supabase.auth.signInWithPassword({
  //       email: userEmail,
  //       password,
  //     });

  //     if (loginError) {
  //       console.error("Login Error:", loginError.message);
  //       alert("Incorrect password");
  //     } else {
  //       console.log("Login Successful!");
  //       alert("Welcome back!");
  //     }
  //   }
  // }
  // async function handleSubmit(e) {
  //   e.preventDefault();

  //   if (!password || !userName) {
  //     console.error("Username and password are required");
  //     alert("Username and password are required");
  //     return;
  //   }

  //   if (title === "Register") {
  //     // 🟢 SIGN UP: Requires username, email, and password
  //     if (!email) {
  //       console.error("Email is required for sign up");
  //       alert("Email is required for sign up");
  //       return;
  //     }

  //     // Sign up user in Supabase Auth
  //     const { data, error } = await supabase.auth.signUp({
  //       email,
  //       password,
  //     });

  //     if (error) {
  //       console.error("Sign Up Error:", error.message);
  //       alert(error.message);
  //     } else {
  //       console.log("Sign Up Successful! Check your email to confirm.");

  //       // 🔹 Store user details in "Clients" table (using `Name` column)
  //       // 🔹 Store user details in "Clients" table (using `Name` column)
  //       const { error: dbError } = await supabase
  //         .from("Clients")
  //         .upsert([{ user_id: data.user.id, Name: userName, email }], {
  //           onConflict: ["email"],
  //         }); // 👈 Avoid duplicate emails

  //       if (dbError) {
  //         console.error("Error saving username:", dbError.message);
  //         alert("Error saving username");
  //       } else {
  //         alert(
  //           "A confirmation email has been sent. Please verify your account."
  //         );
  //       }
  //     }
  //   } else if (title === "Login") {
  //     // 🔵 LOGIN: Use username & password only
  //     const { data, error } = await supabase
  //       .from("Clients") // 👈 Fetch email using "Name" column
  //       .select("email")
  //       .eq("Name", userName) // 👈 Using "Name" instead of "userName"
  //       .single();

  //     if (error || !data) {
  //       console.error("User not found:", error?.message);
  //       alert("Invalid username or password");
  //       return;
  //     }

  //     const userEmail = data.email; // Extract associated email

  //     // 🔹 Authenticate using email & password
  //     const { error: loginError } = await supabase.auth.signInWithPassword({
  //       email: userEmail,
  //       password,
  //     });

  //     if (loginError) {
  //       console.error("Login Error:", loginError.message);
  //       alert("Incorrect password");
  //     } else {
  //       console.log("Login Successful!");
  //       alert("Welcome back!");
  //     }
  //   }
  // }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(userName, email, password);
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
  return (
    <form onSubmit={handleSubmit}>
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
      <Button type="submit">
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
      <i className="bx bxs-user"></i>
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
      <i className="bx bxs-envelope"></i>
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
      <i className="bx bxs-lock-alt"></i>
    </div>
  );
}
export default Form;
