import React from "react";
import { ContentContainer } from "../../components/ContentContainer";
import { ListItemContainer } from "../../components/ListItem/ListItemContainer";
import styles from "./ListItem.module.css";

export const ViewListItems = () => {
  return (
    <ContentContainer>
      <div className={styles["item-image"]}>
        <ListItemContainer></ListItemContainer>
      </div>
    </ContentContainer>
  );
};
