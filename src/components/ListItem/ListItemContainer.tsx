import styles from "./ListItem.module.css";
import React from "react";
import { ListItemCard } from "./ListItemCard";
import { ContentContainer } from "../ContentContainer";

export const ListItemContainer = () => {
  return (
    <ContentContainer className={styles["list-item-container"]}>
      <ListItemCard
        imgLink={""}
        itemName={"First Item"}
        itemDescription={"This is the first item of the web application"}
        itemQuantity={"10"}
      />
      <ListItemCard
        imgLink={""}
        itemName={"First Item"}
        itemDescription={"This is the first item of the web application"}
        itemQuantity={"10"}
      />
      <ListItemCard
        imgLink={""}
        itemName={"First Item"}
        itemDescription={"This is the first item of the web application"}
        itemQuantity={"10"}
      />
      <ListItemCard
        imgLink={""}
        itemName={"First Item"}
        itemDescription={"This is the first item of the web application"}
        itemQuantity={"10"}
      />
      <ListItemCard
        imgLink={""}
        itemName={"First Item"}
        itemDescription={"This is the first item of the web application"}
        itemQuantity={"10"}
      />
    </ContentContainer>
  );
};
