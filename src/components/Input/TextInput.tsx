import Text from "../Text/Text";
import styles from "./Input.module.css";

import React from "react";

type TextInputProps = {
  id?: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  style?: React.CSSProperties;
  label: string;
  error?: string;
  name?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  textAreaRef?: React.RefObject<HTMLTextAreaElement | null>;
  type?: string;
  placeholder?: string;
  isTextObscured?: boolean;
};

export const TextInput: React.FC<TextInputProps> = ({
  id,
  value,
  onChange,
  style,
  label,
  error,
  name,
  inputRef,
  type,
  placeholder,
  textAreaRef,
  isTextObscured,
}) => {
  if (type === "textarea") {
    return (
      <div className={styles["input-container"]}>
        <label htmlFor={id} className={styles["input-label"]}>
          <Text style={{ color: "white", fontWeight: 500 }}>{label}</Text>
        </label>
        <textarea
          value={value}
          onChange={onChange}
          id={id}
          name={name}
          className={styles["input-area"]}
          placeholder={placeholder}
          ref={textAreaRef}
        ></textarea>
      </div>
    );
  }
  if (isTextObscured) {
    return (
      <div className={styles["input-container"]}>
        <label htmlFor={id} className={styles["input-label"]}>
          <Text style={{ color: "white", fontWeight: 500 }}>{label}</Text>
        </label>
        <input
          type="password"
          id={id}
          onChange={onChange}
          style={style}
          value={value}
          className={styles.input}
          name={name}
          ref={inputRef}
          placeholder={placeholder}
        />
      </div>
    );
  }

  return (
    <div className={styles["input-container"]}>
      <label htmlFor={id} className={styles["input-label"]}>
        <Text style={{ color: "white", fontWeight: 500 }}>{label}</Text>
      </label>

      <input
        type="text"
        id={id}
        onChange={onChange}
        style={style}
        value={value}
        className={styles.input}
        name={name}
        ref={inputRef}
        placeholder={placeholder}
      />

      {error && <span className={styles["input-error"]}>{error}</span>}
    </div>
  );
};
