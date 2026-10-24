import { useNavigate } from "react-router";
import { ContentContainer } from "../ContentContainer";
import { ListCard } from "./ListCard";
import styles from "./List.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchLists } from "../../redux/slices/ListSlice";
import { useEffect } from "react";
import Text from "../Text/Text";

export const ListContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const navigateToListItems = (id: string) => {
    navigate(`/lists/${id}`);
  };

  const { items, status, error } = useAppSelector((state) => state.lists);

  useEffect(() => {
    dispatch(fetchLists());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading Shopping Lists from server</div>;
  }

  if (status === "failed") {
    return <div>Error loading lists {error}</div>;
  }

  return (
    <>
      {items.length === 0 ? (
        <ContentContainer className={styles["empty-state"]}>
          <Text variant="h3" style={{ color: "white" }}>
            No shopping lists found
          </Text>
        </ContentContainer>
      ) : (
        <ContentContainer>
          <div className={styles["list-container"]}>
            {items.map((list) => (
              <ListCard
                name={list.name}
                desc={list.description}
                dateCreated={list.dateCreated}
                id={list.id}
                key={list.id}
                navigateToListItems={() => navigateToListItems(list.id)}
              />
            ))}
          </div>
        </ContentContainer>
      )}
    </>
  );
};
