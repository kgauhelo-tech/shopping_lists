import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { useNavigate, useParams } from "react-router";
import { ContentContainer } from "../../components/ContentContainer";
import styles from "./ListItem.module.css";
import { ArrowLeftCircle } from "reicon-react";
import Text from "../../components/Text/Text";
import {
  deleteListItem,
  fetchListItems,
} from "../../redux/slices/ListItemSlice";

export const ListItemDetails = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id: listId, itemId } = useParams<{ id: string; itemId: string }>();

  const { items, status } = useAppSelector((state) => state.listItems);

  // 1. Fetch items if store is empty or page was directly refreshed
  useEffect(() => {
    if (listId && items.length === 0 && status !== "loading") {
      dispatch(fetchListItems(listId));
    }
  }, [dispatch, listId, items.length, status]);

  // 2. Loose string/number ID matching (String(item.id) === String(itemId))
  const currentItem = items.find((item) => String(item.id) === String(itemId));

  const handleDeleteItem = async () => {
    if (!itemId) return;
    try {
      await dispatch(deleteListItem(itemId)).unwrap();
      navigate(-1);
    } catch (error) {
      console.error("Failed to delete list item:", error);
    }
  };

  const handleEditItem = () => {
    navigate(`/lists/${listId}/updateItem/${itemId}`);
  };

  const navigateBack = () => {
    navigate(-1);
  };

  if (status === "loading" && items.length === 0) {
    return (
      <ContentContainer className={styles["details"]}>
        <Text variant="h2" style={{ color: "white" }}>
          Loading list item...
        </Text>
      </ContentContainer>
    );
  }

  if (!currentItem) {
    return (
      <ContentContainer className={styles["details"]}>
        <div className={styles["top-level"]}>
          <ArrowLeftCircle
            onClick={navigateBack}
            style={{ cursor: "pointer" }}
          />
          <Text variant="h3" style={{ color: "white" }}>
            Item not found.
          </Text>
        </div>
      </ContentContainer>
    );
  }

  return (
    <ContentContainer className={styles["details"]}>
      <div className={styles["top-level"]}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <ArrowLeftCircle
            onClick={navigateBack}
            style={{ cursor: "pointer" }}
          />
          <Text variant="h2">List Item Details</Text>
        </div>
        <div className={styles["btn-cont"]}>
          <button className={styles["delete-btn"]} onClick={handleDeleteItem}>
            <Text>Delete Item</Text>
          </button>
          <button className={styles["edit-btn"]} onClick={handleEditItem}>
            <Text>Edit Item</Text>
          </button>
        </div>
      </div>

      <div className={styles["details-content"]} style={{ marginTop: "20px" }}>
        {currentItem.imgLink && (
          <div style={{ marginBottom: "16px" }}>
            <img
              src={currentItem.imgLink}
              alt={currentItem.name}
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            />
          </div>
        )}
        <Text variant="h3">
          <strong>Name:</strong> {currentItem.name}
        </Text>
        <Text>
          <strong>Description:</strong> {currentItem.description}
        </Text>
        <Text>
          <strong>Quantity:</strong> {currentItem.quantity}
        </Text>
      </div>
    </ContentContainer>
  );
};
