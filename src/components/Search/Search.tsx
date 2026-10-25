import styles from "./Search.module.css";
import { Search } from "reicon-react";
import { useSearchParams } from "react-router";

export type SearchbarProps = {
  ref?: React.RefObject<HTMLInputElement | null>;
  onSearch: (value: string) => void;
};

export const SearchComponent: React.FC<SearchbarProps> = ({
  ref,
  onSearch,
}) => {
  const [searchParams] = useSearchParams();
  const currentSearch = searchParams.get("search") || "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && ref?.current) {
      onSearch(ref.current.value);
    }
  };

  const handleIconClick = () => {
    if (ref?.current) {
      onSearch(ref.current.value);
    }
  };

  return (
    <div className={styles["search-bar"]}>
      <input
        ref={ref}
        type="text"
        defaultValue={currentSearch}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search items"
        className={styles["search-input"]}
      />
      <div className={styles["icon-container"]}>
        <Search onClick={handleIconClick} className={styles["search-icon"]} />
      </div>
    </div>
  );
};
