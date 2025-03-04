import LoginSignUPForm from "./LoginSignUPForm";
// import styles from "./Login.module.css";
// import "../Components/index.css";
import Form from "./Form";

function BoxRegister() {
  return (
    <div className="form-box register" key="login">
      <LoginSignUPForm showEmail={true} title="Register" key="register" />
      {/* <Form showEmail={true} title="Register" />
      </LoginSignUPForm> */}
    </div>
  );
}

export default BoxRegister;
