import styles from "./List.module.css";
import Text from "../Text/Text";
import { ArrowUpRight, Menu } from "reicon-react";

export type ListProps = {
  name: string;
  desc: string;
  dateCreated: number;
  imgLink?: string;
  id: string;
  navigateToListItems: (id: string) => void;
};

export const ListCard: React.FC<ListProps> = ({
  name,
  id,
  desc,
  imgLink,
  navigateToListItems,
}) => {
  return (
    <article className={styles["list-card"]}>
      <div className={styles["image-container"]}>
        <div
          onClick={() => navigateToListItems(id)}
          className={styles["list-img"]}
        >
          {!imgLink ? (
            <Menu className={styles["img"]} />
          ) : (
            <img
              src={imgLink}
              alt="picture for the list"
              className={styles["img"]}
            />
          )}
        </div>
      </div>

      <div className={styles["secondary-container"]}>
        <div className={styles["text-container"]}>
          <Text variant="h3">{name}</Text>
          <div className={styles["description-container"]}>
            <Text>{desc}</Text>
          </div>
        </div>
        <div className={styles["indicator-container"]}>
          <span
            onClick={() => {
              navigateToListItems(id);
            }}
          >
            <ArrowUpRight className={styles["arrow"]} />
          </span>
        </div>
      </div>
    </article>
  );
};
