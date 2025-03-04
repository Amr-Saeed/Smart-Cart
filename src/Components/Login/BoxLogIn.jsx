import LoginSignUPForm from "./LoginSignUPForm";
// import styles from "./Login.module.css";
// import "../Components/index.css";

function BoxLogIn() {
  return (
    <div className="form-box login" key="login">
      <LoginSignUPForm
        type="login"
        showEmail={false}
        title="Login"
        key="login"
      />
    </div>
  );
}

export default BoxLogIn;
