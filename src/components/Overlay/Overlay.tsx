import React from "react";
import styles from "./Overlay.module.css";
import { X } from "reicon-react";

type OverlayProps = {
  children: React.ReactNode;
  close: () => void;
};

export const Overlay: React.FC<OverlayProps> = ({ children, close }) => {
  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className={styles["overlay"]} onClick={close}>
      <div className={styles["overlay-child"]} onClick={stopPropagation}>
        <X
          className={styles["close-icon"]}
          height={20}
          style={{ color: "black" }}
          onClick={close}
        />

        {children}
      </div>
    </div>
  );
};
