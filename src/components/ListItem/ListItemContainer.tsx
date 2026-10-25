import styles from "./ListItem.module.css";

import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";

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
  const { id } = useParams<{ id: string }>();

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const sortBy = searchParams.get("sortBy") || "name";
  const order = searchParams.get("order") || "asc";

  const navigateToListItems = (itemId: string) => {
    navigate(`/lists/${id}/items/${itemId}`);
  };

  const { items, status, error } = useAppSelector((state) => state.listItems);

  const handleSearch = (value: string) => {
    setSearchParams((prev) => {
      if (value.trim()) {
        prev.set("search", value);
      } else {
        prev.delete("search");
      }
      return prev;
    });
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortField = e.target.value;
    const currentSortBy = searchParams.get("sortBy") || "name";
    const currentOrder = searchParams.get("order") || "asc";

    let nextOrder = "asc";
    if (currentSortBy === sortField) {
      nextOrder = currentOrder === "asc" ? "desc" : "asc";
    }

    setSearchParams((prev) => {
      prev.set("sortBy", sortField);
      prev.set("order", nextOrder);
      prev.delete("sort");
      return prev;
    });
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchListItems(id));
    }
  }, [dispatch, id]);

  if (status === "loading") return <Text>Fetching list items...</Text>;

  if (status === "failed")
    return (
      <Text
        variant="h2"
        style={{ color: "var(--text-color)", paddingTop: "10px" }}
      >
        {items.length === 0
          ? "There are no list items for this list"
          : `${error}`}
      </Text>
    );

  const filteredItems = items.filter((listItem: ListItem) => {
    const query = searchQuery.toLowerCase();
    return (
      listItem.name.toLowerCase().includes(query) ||
      (listItem.description &&
        listItem.description.toLowerCase().includes(query))
    );
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    let comparison = 0;

    if (sortBy === "name") {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === "category") {
      const catA = (a as any).category || "";
      const catB = (b as any).category || "";
      comparison = catA.localeCompare(catB);
    } else if (sortBy === "date") {
      const dateA = new Date((a as any).dateCreated || 0).getTime();
      const dateB = new Date((b as any).dateCreated || 0).getTime();
      comparison = dateA - dateB;
    }

    return order === "asc" ? comparison : -comparison;
  });

  return (
    <ContentContainer className={styles["list-item-container"]}>
      <Actions
        heading="Shopping list items"
        onSearch={handleSearch}
        onSort={handleSort}
        buttonNavigatesTo="addItem"
        btnValue="Add Item"
      />
      <div className={styles.items}>
        {sortedItems.length === 0 ? (
          <ContentContainer className={styles["empty-state"]}>
            <Text variant="h2" style={{ color: "white" }}>
              {searchQuery
                ? "No matching shopping list items found"
                : "No shopping list items found"}
            </Text>
            {!searchQuery && (
              <Text variant="h3" style={{ color: "white" }}>
                Add shopping list items
              </Text>
            )}
          </ContentContainer>
        ) : (
          sortedItems.map((listItem: ListItem) => (
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
      </div>
    </ContentContainer>
  );
};
