import React, { useState, type RefObject } from "react";
import { Searchbar } from "../Search/Searchbar";
import styles from "./Actions.module.css";
import Text from "../Text/Text";
import { Add, ArrowLeftCircle, Sort, X } from "reicon-react";
import { ContentContainer } from "../ContentContainer";
import { useNavigate } from "react-router";

type ActionsProps = {
  hasBackButton?: boolean;
  heading: string;
  ref: RefObject<HTMLInputElement | null>;
  onSearch: () => void;
  buttonNavigatesTo: string;
  btnValue: string;
};

export const Actions: React.FC<ActionsProps> = ({
  ref,
  onSearch,
  heading,
  hasBackButton,
  buttonNavigatesTo,
  btnValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleMoreActions = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  const handleCreate = () => {
    navigate(buttonNavigatesTo);
  };

  const handleNavigateBack = () => {
    navigate(-1);
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
          <Sort /> <Text>Sort by:</Text>
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
          <Sort />
          <Text>Sort by:</Text>
        </div>
        <button onClick={handleCreate} className={styles["action-btn"]}>
          <Text variant="h3">{btnValue}</Text>
        </button>
      </div>
    </ContentContainer>
  );
};
