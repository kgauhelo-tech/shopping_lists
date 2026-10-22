import { useRef } from "react";
import { Actions } from "../components/Actions/Actions";
import { useAppSelector } from "../redux/hooks";
import { ListContainer } from "../components/List/ListContainer";

export const Home = () => {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const handleSearch = () => {};

  return (
    <div
      style={{
        width: "100%",
        minWidth: "100%",
        overflow: "visible",
        display: "block",
      }}
    >
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
