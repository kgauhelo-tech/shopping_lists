import { useRef } from "react";
import { Actions } from "../components/Actions/Actions";

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
        isMoreActionsOpen={true}
        heading="Shopping Lists"
        hasBackButton={true}
        ref={searchRef}
        onSearch={handleSearch}
      ></Actions>
    </div>
  );
};
