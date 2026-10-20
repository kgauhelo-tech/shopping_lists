import { useRef } from "react";

import { Button } from "../../components/Input/Button";
import { TextInput } from "../../components/Input/TextInput";
import Text from "../../components/Text/Text";
import styles from "./Auth.module.css";

export const Register = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const surnameRef = useRef<HTMLInputElement>(null);
  const cellNumberRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const handleValidation = () => {};
  const handleSubmit = () => {};
  return (
    <div className={styles["reg-container"]}>
      <form className={styles["reg-content"]}>
        <div className={styles["left-container"]}>
          <Text variant="h2">Register</Text>
          <Text>Pleased to have you!</Text>

          <Text style={{ color: "#fff", opacity: 0.8 }}>
            By signing up, you accept our <span>Terms and conditions</span>
          </Text>
        </div>

        <div className={styles["right-container"]}>
          <TextInput
            style={{
              backgroundColor: "#04284d",
              display: "flex",
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "16px",
            }}
            placeholder="Thorfinn"
            ref={nameRef}
            label="Name"
            name="firstName"
            onChange={handleValidation}
          />

          <TextInput
            style={{
              backgroundColor: "#04284d",
              display: "flex",
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "16px",
            }}
            placeholder="Thors"
            ref={surnameRef}
            label="Surname"
            name="surname"
            onChange={handleValidation}
          />

          <TextInput
            style={{
              backgroundColor: "#04284d",
              display: "flex",
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "16px",
            }}
            placeholder="000 0000 0000"
            ref={cellNumberRef}
            label="Phone Number"
            name="phoneNumber"
            onChange={handleValidation}
          />

          <TextInput
            style={{
              backgroundColor: "#04284d",
              display: "flex",
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "16px",
            }}
            placeholder="example@email.com"
            ref={emailRef}
            label="Email"
            onChange={handleValidation}
          />

          <TextInput
            style={{
              backgroundColor: "#04284d",
              display: "flex",
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "16px",
            }}
            placeholder="●●●●●●●●●●"
            ref={passwordRef}
            label="Password"
            name="password"
            onChange={handleValidation}
          />

          <TextInput
            style={{
              backgroundColor: "#04284d",
              display: "flex",
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "16px",
            }}
            placeholder="●●●●●●●●●●"
            ref={confirmPasswordRef}
            label="Password"
            name="confirmPassword"
            onChange={handleValidation}
          />

          <Button
            value={"Register"}
            style={{ marginTop: "20" }}
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};
