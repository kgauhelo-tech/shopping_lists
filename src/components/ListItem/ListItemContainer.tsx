import styles from "./ListItem.module.css";

import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";

import { ListItemCard } from "./ListItemCard";
import { ContentContainer } from "../ContentContainer";
import Text from "../Text/Text";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import type { ListItem } from "../../types/types";
import { fetchListItems } from "../../redux/slices/ListItemSlice";
import { Actions } from "../Actions/Actions";

export const ListItemContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement | null>(null);

  const navigateToListItems = (id: string) => {
    navigate(`/lists/${id}`);
  };

  const { items, status, error } = useAppSelector((state) => state.listItems);

  const handleSearch = () => {
    const query = useSearchParams();
  };

  useEffect(() => {
    dispatch(fetchListItems());
  }, [dispatch]);

  if (status === "loading") return <Text>Fetching list items</Text>;

  if (status === "failed")
    return <Text>Failed to load list items. {error}</Text>;

  return (
    <ContentContainer className={styles["list-item-container"]}>
      <Actions
        heading="Shopping list items"
        ref={searchRef}
        onSearch={handleSearch}
        buttonNavigatesTo="addItem"
        hasBackButton={true}
      />
      {items.length === 0 ? (
        <ContentContainer className={styles["empty-state"]}>
          <Text>No shopping list items found</Text>
          <Text>Add shopping list items</Text>
        </ContentContainer>
      ) : (
        items.map((listItem: ListItem) => (
          <ListItemCard
            key={listItem.id}
            imgLink={listItem.imgLink}
            itemName={listItem.name}
            itemDescription={listItem.description}
            itemQuantity={listItem.quantity}
            onClick={() => navigateToListItems(listItem.id)}
          />
        ))
      )}
    </ContentContainer>
  );
};
