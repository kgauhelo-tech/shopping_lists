import styles from "./Stock.module.css";
import Text from "../Text/Text";
import { Icon } from "reicon-react";
import { Button } from "../Input/Button";

export type ItemCardProps = {
  name: string;
  desc: string;
  imgLink?: string;
  price: number;
  rating?: number;
  icon: any;
  id: number;
  addToCart: (id: number) => void;
};

export const ItemCard: React.FC<ItemCardProps> = ({
  name,
  desc,
  icon,
  price,
  rating,
  addToCart,
  id,
}) => {
  return (
    <article className={styles["item-card"]}>
      <div className={styles["item-img"]}>
        {icon ? icon : <Icon size={100} />}
      </div>
      <Text style={{ fontWeight: 600 }}>{name}</Text>
      <Text>{desc}</Text>
      <Text style={{ fontWeight: 700 }}>R{price}</Text>
      <Text>{rating}</Text>
      <Button
        value={"Add to Cart"}
        onClick={() => addToCart(id)}
        style={{ marginTop: "auto" }}
      />
    </article>
  );
};
