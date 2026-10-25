import { useNavigate, useSearchParams } from "react-router";
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

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const sortBy = searchParams.get("sortBy") || "name";
  const order = searchParams.get("order") || "asc";

  const navigateToListItems = (id: string) => {
    navigate(`/lists/${id}`);
  };

  const { items, status, error } = useAppSelector((state) => state.lists);
  const { activeUserId } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchLists());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading Shopping Lists from server</div>;
  }

  if (status === "failed") {
    return <div>Error loading lists {error}</div>;
  }

  const userLists = items.filter((list) => list.userId === activeUserId);

  const filteredItems = userLists.filter((list) =>
    list.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    let comparison = 0;

    if (sortBy === "name") {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === "category") {
      const catA = a.category || "";
      const catB = b.category || "";
      comparison = catA.localeCompare(catB);
    } else if (sortBy === "date") {
      const dateA = new Date(a.dateCreated).getTime();
      const dateB = new Date(b.dateCreated).getTime();
      comparison = dateA - dateB;
    }

    return order === "asc" ? comparison : -comparison;
  });

  return (
    <>
      {sortedItems.length === 0 ? (
        <ContentContainer className={styles["empty-state"]}>
          <Text variant="h3" style={{ color: "white" }}>
            {searchQuery
              ? "No matching shopping lists found"
              : "No shopping lists found"}
          </Text>
        </ContentContainer>
      ) : (
        <ContentContainer>
          <div className={styles["list-container"]}>
            {sortedItems.map((list) => (
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
