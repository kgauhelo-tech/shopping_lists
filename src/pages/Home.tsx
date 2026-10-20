import { useRef, type MouseEvent } from "react";
import { SearchComponent } from "../components/Search/Search";
import { ListContainer } from "../components/List/ListContainer";
import { Actions } from "../components/Actions/Actions";
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
