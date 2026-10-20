import { useNavigate } from "react-router";
import { ContentContainer } from "../ContentContainer";
import { ListCard } from "./ListCard";
import styles from "./List.module.css";

export const ListContainer: React.FC = ({}) => {
  const navigate = useNavigate();

  const navigateToListItems = () => {};

  return (
    <ContentContainer>
      {/* <div id={styles["list-cont"]}>
        {stock &&
          stock.length > 0 &&
          stock.map((product) => {
            return (
              <ListCard
                name={"List 1"}
                desc={product.desc}
                imgLink={product.img}
                id={product.id}
                dateCreated={product.dateCreated}
                navigateToListItems={() => {
                  navigate(`listItems/${product.id}`);
                }}
              />
            );
          })}
      </div> */}

      <div className={styles["list-container"]}>
        <ListCard
          name={"List One Name"}
          desc={
            "This is the description for the first list item of the shopping list. I want to see how it will look with text embedded in it"
          }
          dateCreated={Date.now()}
          navigateToListItems={() => {}}
          id=""
        ></ListCard>
        <ListCard
          name={"List One Name"}
          desc={
            "This is the description for the first list item of the shopping list. I want to see how it will look with text embedded in it"
          }
          dateCreated={Date.now()}
          navigateToListItems={() => {}}
          id=""
        ></ListCard>
      </div>
    </ContentContainer>
  );
};
