import { useRef } from "react";
import { Actions } from "../components/Actions/Actions";
import { useAppSelector } from "../redux/hooks";
import { ListContainer } from "../components/List/ListContainer";
import { ContentContainer } from "../components/ContentContainer";
import Text from "../components/Text/Text";
import styles from "./pages.module.css";

export const Home = () => {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const handleSearch = () => {};

  const { activeUserId, users } = useAppSelector((state) => state.users);

  const currentUser = users.find((user) => user.id === activeUserId);

  if (currentUser) {
    return (
      <div style={{}}>
        <Actions
          btnValue="Add List"
          heading="Shopping Lists"
          hasBackButton={false}
          ref={searchRef}
          onSearch={handleSearch}
          buttonNavigatesTo="addList"
        />

        <ListContainer></ListContainer>
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
