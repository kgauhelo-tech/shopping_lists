import { useNavigate } from "react-router";
import { ContentContainer } from "../ContentContainer";
import { ListCard } from "./ListCard";
import styles from "./List.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchLists } from "../../redux/slices/ListSlice";
import { useEffect, useRef } from "react";
import { Actions } from "../Actions/Actions";
import Text from "../Text/Text";

export const ListContainer = () => {
  const dispatch = useAppDispatch();
  const searchRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const handleSearch = () => {};
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
      <Actions
        hasBackButton={false}
        heading={"Shopping Lists"}
        ref={searchRef}
        onSearch={handleSearch}
        isMoreActionsOpen={false}
      ></Actions>
      {items.length === 0 ? (
        <Text>No shopping list items found</Text>
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
                navigateToListItems={navigateToListItems}
              />
            ))}
          </div>
        </ContentContainer>
      )}
    </>
  );
};
