import { ContentContainer } from "../ContentContainer";
import styles from "./Search.module.css";
import { SearchComponent, type SearchbarProps } from "./Search";

export const Searchbar: React.FC<SearchbarProps> = ({ ref, onSearch }) => {
  return (
    <div className={styles["search-container"]}>
      <ContentContainer className={styles["searchbar-container"]}>
        <SearchComponent ref={ref} onSearch={onSearch} />
      </ContentContainer>
    </div>
  );
};
