import { Menu4 } from "reicon-react";
import styles from "./ListItem.module.css";
import React from "react";
import Text from "../Text/Text";

type CardProps = {
  imgLink: string;
  itemName: string;
  itemDescription: string;
  itemQuantity: string;
};

export const ListItemCard: React.FC<CardProps> = ({
  imgLink,
  itemName,
  itemDescription,
  itemQuantity,
}) => {
  return (
    <div className={styles["item-card"]}>
      <div className={styles["image-container"]}>
        {imgLink.length > 0 ? (
          <img src="" className={styles.image} alt={`image of ${itemName}`} />
        ) : (
          <Menu4 className={styles.image} />
        )}
      </div>

      <div className={styles["item-name"]}>
        <Text variant="h3">
          {itemName.length > 0 ? itemName : "Name Not Set"}
        </Text>
      </div>

      <div className={styles["item-description"]}>
        <Text style={{ height: 42, overflow: "hidden" }}>
          {itemDescription.length > 0 ? itemDescription : "Description Not Set"}
        </Text>
      </div>

      <div className={styles["item-quantity"]}>
        <Text>
          Quantity:{" "}
          <span style={{ fontWeight: "bold" }}>
            {itemQuantity.length > 0 ? itemQuantity : "Not Set"}
          </span>
        </Text>
      </div>
    </div>
  );
};
