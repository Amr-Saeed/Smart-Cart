import { SignUp } from "@clerk/clerk-react";

function CustomSignUp() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <SignUp signInUrl="/" />{" "}
      {/* Redirect to SignIn when "Sign In" is clicked */}
    </div>
  );
}

export default CustomSignUp;
