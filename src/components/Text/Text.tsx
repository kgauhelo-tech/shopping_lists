import styles from "./Text.module.css";

import React from "react";

type TextVariant = "p" | "h1" | "h2" | "h3";
interface TextProps {
  variant?: TextVariant;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Text: React.FC<TextProps> = ({ variant, children, style }) => {
  switch (variant) {
    case "p":
      return (
        <p className={styles.paragraph} style={style}>
          {children}
        </p>
      );
    case "h1":
      return (
        <h1 className={styles.h1} style={style}>
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2 className={styles.h2} style={style}>
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3 className={styles.h3} style={style}>
          {children}
        </h3>
      );
    default:
      return (
        <p className={styles.paragraph} style={style}>
          {children}
        </p>
      );
  }
};

export default Text;
