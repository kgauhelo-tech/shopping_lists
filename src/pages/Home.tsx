import { useSearchParams } from "react-router";
import { Actions } from "../components/Actions/Actions";
import { useAppSelector } from "../redux/hooks";
import { ListContainer } from "../components/List/ListContainer";
import { ContentContainer } from "../components/ContentContainer";
import Text from "../components/Text/Text";
import styles from "./pages.module.css";

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { activeUserId, users } = useAppSelector((state) => state.users);
  const currentUser = users.find((user) => user.id === activeUserId);

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

  if (currentUser) {
    return (
      <div style={{}}>
        <Actions
          onSort={handleSort}
          btnValue="Add List"
          heading="Shopping Lists"
          hasBackButton={false}
          onSearch={handleSearch}
          buttonNavigatesTo="addList"
        />

        <ListContainer />
      </div>
    );
  } else {
    return (
      <ContentContainer className={styles["text-container"]}>
        <Text style={{ color: "white", paddingTop: "20px" }} variant="h2">
          Login to view and create your lists
        </Text>
      </ContentContainer>
    );
  }
};
