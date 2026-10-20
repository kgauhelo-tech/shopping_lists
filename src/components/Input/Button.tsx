import React from "react";

import styles from "./Input.module.css";
import Text from "../Text/Text";

export const Button: React.FC<React.InputHTMLAttributes<HTMLButtonElement>> = ({
  ...rest
}) => {
  // return <input type="button" className={styles.button} {...rest} />;
  return (
    <button className={styles.button}>
      <Text style={{ fontWeight: 500 }}>{rest.value}</Text>
    </button>
  );
};
