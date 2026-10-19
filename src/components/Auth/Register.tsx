import styles from "./Auth.module.css";
import { Overlay } from "../Overlay/Overlay";
import { TextInput } from "../Input/TextInput";
import Text from "../Text/Text";
import { Button } from "../Input/Button";
import { useRef } from "react";

type RegisterProps = {
  close: () => void;
  isVisible: boolean;
};

export const Register: React.FC<RegisterProps> = ({ isVisible, close }) => {
  const nameRef = useRef(null);
  const surnameRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleSubmit = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault;
  };

  const handleValidation = () => {};

  if (!isVisible) return null;
  return (
    <Overlay close={close}>
      <form className={styles["auth-container"]}>
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
          ref={phoneNumberRef}
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
    </Overlay>
  );
};
