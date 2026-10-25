import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { useNavigate, useParams } from "react-router";
import { ContentContainer } from "../../components/ContentContainer";
import styles from "./ListItem.module.css";
import { ArrowLeftCircle, CartLarge2 } from "reicon-react";
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

  useEffect(() => {
    if (listId && items.length === 0 && status !== "loading") {
      dispatch(fetchListItems(listId));
    }
  }, [dispatch, listId, items.length, status]);

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
            className={styles.back}
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
        <div style={{ marginBottom: "16px" }} className={styles["img-cont"]}>
          {currentItem.imgLink && (
            <img
              className={styles.img}
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
          )}
          {!currentItem.imgLink && <CartLarge2 className={styles.img} />}
        </div>

        <div className={styles.text}>
          <div className={styles.prop}>
            <Text>Name</Text>
            <Text variant="h3">{currentItem.name}</Text>
          </div>
          <div className={styles.prop}>
            <Text>Description</Text>
            <Text variant="h3">{currentItem.description}</Text>
          </div>
          <div className={styles.prop}>
            <Text>Quantity</Text>
            <Text variant="h3">{currentItem.quantity}</Text>
          </div>
        </div>
      </div>
    </ContentContainer>
  );
};
