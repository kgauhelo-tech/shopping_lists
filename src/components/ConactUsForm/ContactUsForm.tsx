import React from "react";
import styles from "./ContactusForm.module.css";
import Text from "../Text/Text";
import { TextInput } from "../Input/TextInput";
import { Button } from "../Input/Button";

type Props = {
  handleSubmit: React.MouseEventHandler<HTMLInputElement>;
};

export const ContactUsForm: React.FC<Props> = ({ handleSubmit }) => {
  return (
    <div className={styles.page}>
      <form className={styles["contact-us"]}>
        <Text variant="h2" style={{ color: "black", margin: 0 }}>
          Have a query to report or question to ask?
        </Text>
        <Text variant="h2" style={{ color: "black", margin: 0 }}>
          Send us an email
        </Text>
        <TextInput onChange={(ev) => {}} label="Name" name="firstName" />
        <TextInput onChange={(ev) => {}} label="Surname" name="surname" />
        <TextInput
          onChange={(ev) => {}}
          label="Phone Number"
          name="phoneNumber"
        />
        <TextInput
          onChange={(ev) => {}}
          label="Email Address"
          name="emailAddress"
        />
        <TextInput
          type="textarea"
          onChange={() => {}}
          label="Message"
          name="message"
        />

        <Button
          value={"send Email"}
          style={{ marginTop: 20 }}
          type="submit"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};
