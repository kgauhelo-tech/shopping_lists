import { useRef } from "react";
import { Actions } from "../components/Actions/Actions";
import { useAppSelector } from "../redux/hooks";
import { ListContainer } from "../components/List/ListContainer";
import { setActiveUser } from "../redux/slices/authSlice";

export const Home = () => {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const handleSearch = () => {};

  const { activeUserId, users } = useAppSelector((state) => state.users);

  const currentUser = users.find((user) => user.id === activeUserId);
  return (
    <div style={{}}>
      <Actions
        heading="Shopping Lists"
        hasBackButton={false}
        ref={searchRef}
        onSearch={handleSearch}
        buttonNavigatesTo="addList"
      />

      <ListContainer></ListContainer>
    </div>
  );
};
