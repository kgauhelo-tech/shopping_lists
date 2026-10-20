import React, { type RefObject } from "react";
import { Searchbar } from "../Search/Searchbar";
import styles from "./Actions.module.css";
import { Button } from "../Input/Button";

type ActionsProps = {
  ref: RefObject<HTMLInputElement | null>;
  onSearch: () => void;
};

export const Actions: React.FC<ActionsProps> = ({ ref, onSearch }) => {
  return (
    <div>
      <Searchbar ref={ref} onSearch={onSearch}></Searchbar>
      <Button>New List</Button>
    </div>
  );
};
