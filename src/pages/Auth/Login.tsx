import { useRef } from "react";
import { Button } from "../../components/Input/Button";
import { TextInput } from "../../components/Input/TextInput";
import Text from "../../components/Text/Text";
import styles from "./Auth.module.css";

export const Login = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleValidation = () => {};

  const handleSubmit = () => {};

  return (
    <div className={styles["auth-container"]}>
      <Text variant="h2" style={{ color: "rgb(20, 20, 20)" }}>
        Login
      </Text>
      <div className={styles["input-container"]}>
        <TextInput ref={emailRef} label="Email" onChange={handleValidation} />
        <TextInput
          ref={passwordRef}
          label="Password"
          onChange={handleValidation}
        />
        <Button
          onClick={handleSubmit}
          value={"Login"}
          style={{ marginTop: "20" }}
        />
      </div>
    </div>
  );
};
