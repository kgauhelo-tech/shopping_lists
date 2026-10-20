import { useRef, useState } from "react";
import { Button } from "../../components/Input/Button";
import { TextInput } from "../../components/Input/TextInput";
import Text from "../../components/Text/Text";
import styles from "./Auth.module.css";

export const Login = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [isEmailValid, setIsEmailValid] = useState("");

  // Display validation status upon submitting
  // If valid, login, else: show error message
  const handleEmailValidation = () => {
    // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // let currentValue = emailRef.current?.value;
    // let value;
    // if (currentValue) value = emailRegex.test(currentValue);
    // value
    //   ? setIsEmailValid("Email is valid!")
    //   : setIsEmailValid("Make sure your email is valid");
  };
  const handlePasswordValidation = () => {
    passwordRef.current?.value;
  };

  const handleSubmit = () => {};

  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-content"]}>
        <div className={styles["text-container"]}>
          <Text variant="h2">Login</Text>
          <Text>Welcome back!</Text>
        </div>
        <div className={styles["input-container"]}>
          <div>
            <TextInput
              ref={emailRef}
              label="Email"
              placeholder="example@email.com"
              style={{
                backgroundColor: "#04284d",
                display: "flex",
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "16px",
              }}
              onChange={handleEmailValidation}
            />
          </div>

          <div>
            <TextInput
              ref={passwordRef}
              label="Password"
              placeholder="●●●●●●●●●●"
              style={{
                backgroundColor: "#04284d",
                display: "flex",
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "16px",
              }}
              onChange={handlePasswordValidation}
            />
          </div>
          <Button
            onClick={handleSubmit}
            value={"Login"}
            style={{
              marginTop: "20",
              backgroundColor: "white",
              color: "#07407d",
            }}
          />
        </div>
      </div>
    </div>
  );
};
