import React from "react";

import styles from "./Input.module.css";

export const Button: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  ...rest
}) => {
  return <input type="button" className={styles.button} {...rest} />;
};
