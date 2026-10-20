import { useRef, type MouseEvent } from "react";
import { ListContainer } from "../components/List/ListContainer";
import { Searchbar } from "../components/Search/Searchbar";

export const Home = () => {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const handleSearch = () => {};

  return (
    <div>
      <Searchbar ref={searchRef} onSearch={handleSearch} />
      <ListContainer></ListContainer>
    </div>
  );
};
