import { ArrowLeftCircle } from "reicon-react";
import { ViewListItems } from "../ListItem/ViewListItems";
import Text from "../../components/Text/Text";
import styles from "./Lists.module.css";
import { ContentContainer } from "../../components/ContentContainer";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch } from "../../redux/hooks";
import { deleteList } from "../../redux/slices/ListSlice";
import { Actions } from "../../components/Actions/Actions";
import { useRef } from "react";

export const ListDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchRef = useRef(null);

  const handleDeleteList = async () => {
    if (!params.id) return;
    try {
      await dispatch(deleteList(params.id)).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Failed to delete list:", error);
    }
  };

  const handleEditList = () => {
    navigate(`/editList/${params.id}`);
  };

  const handleSearchListItems = () => {};

  return (
    <div>
      <ContentContainer className={styles["top-level"]}>
        <div className={styles["back-container"]}>
          <ArrowLeftCircle
            className={styles.back}
            onClick={() => navigate(-1)}
          />
          <Text variant="h2">Shopping List details</Text>
        </div>
        <div className={styles["btn-cont"]}>
          <button className={styles["delete-btn"]} onClick={handleDeleteList}>
            <Text>Delete list</Text>
          </button>
          <button className={styles["edit-btn"]} onClick={handleEditList}>
            <Text>Edit List</Text>
          </button>
        </div>
        <div></div>
      </ContentContainer>
      <Actions
        heading="List Items"
        ref={searchRef}
        onSearch={handleSearchListItems}
        buttonNavigatesTo={`/lists/${params.id}/addItem`}
        btnValue="Add Item"
      />
      <ViewListItems />
    </div>
  );
};
