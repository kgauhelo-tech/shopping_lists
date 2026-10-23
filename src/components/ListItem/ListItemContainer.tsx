import styles from "./ListItem.module.css";
import React from "react";
import { ListItemCard } from "./ListItemCard";
import { ContentContainer } from "../ContentContainer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router";

export const ListItemContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const navigateToListItems = (id: string) => {
    navigate(`/lists/${id}`);
  };

  const { listItems, status, error } = useAppSelector((state) => state.lists);
  const ListItems: string[] = [];
  return (
    <ContentContainer className={styles["list-item-container"]}>
      {ListItems.map(() => (
        <ListItemCard
          imgLink={""}
          itemName={"First Item"}
          itemDescription={"This is the first item of the web application"}
          itemQuantity={"10"}
        />
      ))}
    </ContentContainer>
  );
};
