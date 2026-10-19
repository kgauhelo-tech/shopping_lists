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
      <Text variant="p" style={{ color: "rgba(20,20,20)", padding: 10 }}>
        Search
      </Text>
      <input ref={ref} type="text" className={styles["search-input"]} />
      <Search onClick={onSearch} className={styles["search-icon"]} />
    </div>
  );
};
