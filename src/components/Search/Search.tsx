import styles from "./Search.module.css";
import Text from "../Text/Text";
import { Search } from "reicon-react";

export type SearchbarProps = {
  ref: React.RefObject<HTMLInputElement | null>;
  onSearch: React.MouseEventHandler;
};

export const SearchComponent: React.FC<SearchbarProps> = ({
  ref,
  onSearch,
}) => {
  return (
    <div className={styles["search-bar"]}>
      <input
        ref={ref}
        type="text"
        placeholder="Search lists"
        className={styles["search-input"]}
      />
      <div className={styles["icon-container"]}>
        <Search onClick={onSearch} className={styles["search-icon"]} />
      </div>
    </div>
  );
};
