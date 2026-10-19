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
};

// Lesson 3 - video 2: 3:01

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
}) => {
  return (
    <div className={styles["input-container"]}>
      <label htmlFor={id} className={styles["input-label"]}>
        {label}
      </label>

      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={onChange}
          id={id}
          name={name}
          className={styles["input-area"]}
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
        />
      )}

      {error && <span className={styles["input-error"]}>{error}</span>}
    </div>
  );
};
