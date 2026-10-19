import type { Product } from "../../App";
import { ContentContainer } from "../ContentContainer";
import { ItemCard } from "./ItemCard";
import styles from "./Stock.module.css";

type StockProps = {
  stock: Product[];
  addToCart: (id: number) => void;
};

export const StockContainer: React.FC<StockProps> = ({ stock, addToCart }) => {
  return (
    <ContentContainer>
      <div id={styles["item-cont"]}>
        {stock &&
          stock.length > 0 &&
          stock.map((product) => {
            return (
              <ItemCard
                name={product.name}
                price={product.price}
                desc={product.desc}
                icon={product.icon}
                id={product.id}
                addToCart={() => addToCart(product.id)}
              />
            );
          })}
      </div>
    </ContentContainer>
  );
};
