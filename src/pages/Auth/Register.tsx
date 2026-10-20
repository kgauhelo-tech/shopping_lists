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
        <Text variant="h2" style={{ color: "rgb(20, 20, 20)" }}>
          Register
        </Text>

        <TextInput
          ref={nameRef}
          label="Name"
          name="firstName"
          onChange={handleValidation}
        />

        <TextInput
          ref={surnameRef}
          label="Surname"
          name="surname"
          onChange={handleValidation}
        />

        <TextInput
          ref={cellNumberRef}
          label="Phone Number"
          name="phoneNumber"
          onChange={handleValidation}
        />

        <TextInput ref={emailRef} label="Email" onChange={handleValidation} />

        <TextInput
          ref={passwordRef}
          label="Password"
          name="password"
          onChange={handleValidation}
        />

        <TextInput
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
        <Text style={{ color: "blue" }}>
          By signing up, you accept our <span>Terms and conditions</span>
        </Text>
      </form>
    </div>
  );
};
