import React from "react";
import styles from "./Auth.module.css";
import { Overlay } from "../Overlay/Overlay";
import { TextInput } from "../Input/TextInput";
import { Button } from "../Input/Button";
import Text from "../Text/Text";

type LoginProps = {
  close: () => void;
  isVisible: boolean;
};

export const Login: React.FC<LoginProps> = ({ close, isVisible }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <Overlay close={close}>
      <div className={styles["auth-container"]}>
        <Text variant="h2" style={{ color: "rgb(20, 20, 20)" }}>
          Login
        </Text>
        <TextInput label="Email" onChange={() => {}}></TextInput>
        <TextInput label="Password" onChange={() => {}}></TextInput>
        <Button value={"Login"} style={{ marginTop: "20" }} />
      </div>
    </Overlay>
  );
};
