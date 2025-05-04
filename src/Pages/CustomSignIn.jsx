import { SignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function CustomSignIn() {
  const navigate = useNavigate();

  // Function to handle "Continue Without Account"
  const handleGuestLogin = () => {
    navigate("/HomePage");
  };

  // async function handleSubmit(e) {
  //   try {
  //     const response = await axios.post("https://nutrigeen.com/api/login", {
  //       email,
  //       password,
  //     });
  //     const token = response.data.token;
  //     if (!token) {
  //       throw new Error("No token returned from login");
  //     }
  //     localStorage.setItem("auth_token", token);
  //     console.log("Login Token:", token);
  //     return token;
  //   } catch (error) {
  //     console.error("Login Error:", error.response?.data || error.message);
  //     throw error;
  //   }
  // }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="place-items-center">
        <h2 className="text-[#213547] font-bold text-[1.5rem] !mb-[15px]">
          Welcome Back!
        </h2>

        {/* Clerk's SignIn Component */}
        <SignIn />
        {/* <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button type="submit" className="btn-continue realtive">
            Sign In
          </button>
        </form> */}

        {/* Guest Login Option */}
        <div style={{ marginTop: "20px", textAlign: "center", color: "gray" }}>
          <p className="!mb-[10px]">Continue without an account?</p>
          <button
            className="btn-continue realtive font-bold"
            onClick={handleGuestLogin}
            style={{}}
          >
            Continue Without Account
          </button>
        </div>

        {/* Terms and Conditions */}
        <div style={{ marginTop: "20px", textAlign: "center", color: "gray" }}>
          By signing in, you agree to our terms and conditions.
        </div>
      </div>
    </div>
  );
}

export default CustomSignIn;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const login = async (email, password) => {
//   try {
//     const response = await axios.post("https://nutrigeen.com/api/login", {
//       email,
//       password,
//     });
//     const token = response.data.token;
//     if (!token) {
//       throw new Error("No token returned from login");
//     }
//     localStorage.setItem("auth_token", token);
//     console.log("Login Token:", token);
//     return token;
//   } catch (error) {
//     console.error("Login Error:", error.response?.data || error.message);
//     throw error;
//   }
// };

// function CustomSignIn() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const token = await login(email, password);
//       console.log("Logged in successfully with token:", token);
//       navigate("/DashBoard");
//     } catch (error) {
//       setError("Invalid email or password");
//     }
//   };

//   const handleGuestLogin = () => {
//     navigate("/HomePage");
//   };

//   return (
//     <div className="w-full h-full flex items-center justify-center">
//       <div className="place-items-center">
//         <h2 className="text-[#213547] font-bold text-[1.5rem] !mb-[15px]">
//           Welcome Back!
//         </h2>

//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             placeholder="Email"
//             name="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="mb-4 p-2 border rounded w-full"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             name="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="mb-4 p-2 border rounded w-full"
//           />
//           {error && <p className="text-red-500 mb-4">{error}</p>}
//           <button
//             type="submit"
//             className="btn-continue relative bg-blue-500 text-white p-2 rounded w-full"
//           >
//             Sign In
//           </button>
//         </form>

//         {/* Guest Login Option */}
//         <div style={{ marginTop: "20px", textAlign: "center", color: "gray" }}>
//           <p className="!mb-[10px]">Continue without an account?</p>
//           <button
//             className="btn-continue relative bg-gray-200 p-2 rounded"
//             onClick={handleGuestLogin}
//           >
//             Continue Without Account
//           </button>
//         </div>

//         {/* Terms and Conditions */}
//         <div style={{ marginTop: "20px", textAlign: "center", color: "gray" }}>
//           By signing in, you agree to our terms and conditions.
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CustomSignIn;
