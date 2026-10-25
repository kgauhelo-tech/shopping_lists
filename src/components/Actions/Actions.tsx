import React, { useState, type RefObject } from "react";
import { Searchbar } from "../Search/Searchbar";
import styles from "./Actions.module.css";
import Text from "../Text/Text";
import { Add, ArrowLeftCircle, Sort, X } from "reicon-react";
import { ContentContainer } from "../ContentContainer";
import { useNavigate, useSearchParams } from "react-router";

type ActionsProps = {
  hasBackButton?: boolean;
  heading: string;
  ref?: RefObject<HTMLInputElement | null>;
  onSearch: (value: string) => void;
  buttonNavigatesTo: string;
  btnValue: string;
  onSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const Actions: React.FC<ActionsProps> = ({
  ref,
  onSearch,
  heading,
  hasBackButton,
  buttonNavigatesTo,
  btnValue,
  onSort,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const navigate = useNavigate();

  // Read current sortBy value from URL so <select> displays the right option
  const [searchParams] = useSearchParams();
  const currentSortBy = searchParams.get("sortBy") || "name";

  const handleMoreActions = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCreate = () => {
    navigate(buttonNavigatesTo);
  };

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const showSort = () => {
    setIsSortOpen((prev) => !prev);
  };

  return hasBackButton ? (
    <ContentContainer className={styles["actions-container"]}>
      <div className={styles["actions-content"]}>
        <div className={styles["actions-left"]}>
          <div className={styles["back-btn"]}>
            <ArrowLeftCircle onClick={handleNavigateBack} />
          </div>
          <Text variant="h2">{heading}</Text>
        </div>
        <div className={styles["actions-right"]}>
          <Searchbar ref={ref} onSearch={onSearch} />
          <div className={styles["more-actions"]}>
            <Sort />
          </div>
          <button className={styles["action-btn"]} onClick={handleCreate}>
            <Text variant="h3">{btnValue}</Text>
          </button>
        </div>
        <div className={styles["sm-actions"]}>
          <div className={styles["more-actions"]} onClick={handleMoreActions}>
            {isOpen ? <X /> : <Add />}
          </div>
        </div>
      </div>

      <div className={isOpen ? `${styles.actions}` : `${styles.hidden}`}>
        <Searchbar ref={ref} onSearch={onSearch} />
        <div className={styles["more-actions"]}>
          <Text>Sort by:</Text>
          <select value={currentSortBy} onChange={onSort}>
            <option value="name">Name</option>
            <option value="category">category</option>
            <option value="date">Date Added</option>
          </select>
        </div>
        <button onClick={handleCreate} className={styles["action-btn"]}>
          <Text variant="h3">{btnValue}</Text>
        </button>
      </div>
    </ContentContainer>
  ) : (
    <ContentContainer className={styles["actions-container"]}>
      <div className={styles["actions-content"]}>
        <div className={styles["actions-left"]}>
          <Text variant="h2">{heading}</Text>
        </div>

        <div className={styles["actions-right"]}>
          <Searchbar ref={ref} onSearch={onSearch} />
          <div className={styles["more-actions"]}>
            <Sort onClick={showSort} />
          </div>
          <button className={styles["action-btn"]} onClick={handleCreate}>
            <Text variant="h3">{btnValue}</Text>
          </button>
        </div>
        <div className={styles["sm-actions"]}>
          <div className={styles["more-actions"]} onClick={handleMoreActions}>
            {isOpen ? <X /> : <Add />}
          </div>
        </div>
      </div>

      <div className={isSortOpen ? `${styles.showSort}` : `${styles.hidden}`}>
        <div className={styles.modal}>
          <Text variant="h3">Sort by:</Text>
          <select value={currentSortBy} onChange={onSort}>
            <option value="name">Name</option>
            <option value="category">category</option>
            <option value="date">Date Added</option>
          </select>
        </div>
      </div>

      <div className={isOpen ? `${styles.actions}` : `${styles.hidden}`}>
        <Searchbar ref={ref} onSearch={onSearch} />
        <div className={styles["more-actions"]}>
          <Text>Sort by:</Text>
          <select value={currentSortBy} onChange={onSort}>
            <option value="name">Name</option>
            <option value="category">category</option>
            <option value="date">Date Added</option>
          </select>
        </div>
        <button onClick={handleCreate} className={styles["action-btn"]}>
          <Text variant="h3">{btnValue}</Text>
        </button>
      </div>
    </ContentContainer>
  );
};
