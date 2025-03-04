import Form from "./Form";
// import Button from "./Button";
import Icons from "./Icons";
// import { useState } from "react";
import DecryptedText from "../TextAnimations/DecryptedText/DecryptedText";

function LoginSignUPForm({ showEmail, title, children }) {
  return (
    <>
      <div>
        <h1>{title}</h1>
        {children}
        <Form showEmail={showEmail} title={title} />
        {/* <Button type="">{title}</Button> */}
        <p>
          {" "}
          <DecryptedText
            text={`or ${title} with social platforms`}
            animateOn="view"
            maxIterations={50}
            speed={80}
          />
        </p>
        <Icons />
      </div>
    </>
  );
}

export default LoginSignUPForm;
