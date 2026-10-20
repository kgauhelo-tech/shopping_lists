import Text from "../Text/Text";
import styles from "./Input.module.css";

import React from "react";

type TextInputProps = {
  id?: string;
  value?: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  style?: React.CSSProperties;
  label: string;
  error?: string;
  name?: string;
  ref?: React.RefObject<HTMLInputElement | null>;
  type?: string;
  placeholder?: string;
};

export const TextInput: React.FC<TextInputProps> = ({
  id,
  value,
  onChange,
  style,
  label,
  error,
  name,
  ref,
  type,
  placeholder,
}) => {
  return (
    <div className={styles["input-container"]}>
      <label htmlFor={id} className={styles["input-label"]}>
        <Text style={{ color: "white", fontWeight: 500 }}>{label}</Text>
      </label>

      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={onChange}
          id={id}
          name={name}
          className={styles["input-area"]}
          placeholder={placeholder}
        ></textarea>
      ) : (
        <input
          type="text"
          id={id}
          onChange={onChange}
          style={style}
          value={value}
          className={styles.input}
          name={name}
          ref={ref}
          placeholder={placeholder}
        />
      )}

      {error && <span className={styles["input-error"]}>{error}</span>}
    </div>
  );
};
