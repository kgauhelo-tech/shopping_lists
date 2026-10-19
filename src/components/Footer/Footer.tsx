import { ContentContainer } from "../ContentContainer";
import styles from "./Footer.module.css";

import Text from "../Text/Text";

export const Footer = () => {
  return (
    <footer>
      <ContentContainer className={styles["footer-content"]}>
        <div>
          <Text variant="h2">Brand-Name</Text>
          <Text variant="p">Tagline goes here!</Text>
        </div>

        <ul>
          <li>
            <Text variant="p">About</Text>
          </li>
          <li>
            <Text variant="p">Products</Text>
          </li>
          <li>
            <Text variant="p">FAQ</Text>
          </li>
          <li>
            <Text variant="p">Support</Text>
          </li>
        </ul>

        <div>
          <div className={styles.contact}>
            <Text variant="p">Contact</Text>
          </div>
        </div>
      </ContentContainer>
    </footer>
  );
};
