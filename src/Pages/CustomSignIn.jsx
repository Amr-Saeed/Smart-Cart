import { SignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function CustomSignIn() {
  const navigate = useNavigate();

  // Function to handle "Continue Without Account"
  const handleGuestLogin = () => {
    // Redirect to a guest-only route (e.g., "/guest-dashboard")
    navigate("/HomePage");
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="place-items-center">
        <h2 className="text-[#213547] font-bold text-[1.5rem] !mb-[15px]">
          Welcome Back!
        </h2>

        {/* Clerk's SignIn Component */}
        <SignIn />

        {/* Guest Login Option */}
        <div style={{ marginTop: "20px", textAlign: "center", color: "gray" }}>
          <p className="!mb-[10px]">Continue without an account?</p>
          <button
            className="btn-continue realtive"
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
