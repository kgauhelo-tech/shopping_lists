import { NavLink, useNavigate } from "react-router";
import styles from "./Navbar.module.css";
import Text from "../Text/Text";
import { useState } from "react";

import { Cart4, Menu4, X } from "reicon-react";
import { ContentContainer } from "../ContentContainer";

type NavbarProps = {
  displayLoginForm: () => void;
  displayRegistrationForm: () => void;
};

const Navbar: React.FC<NavbarProps> = ({
  displayLoginForm,
  displayRegistrationForm,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIconClick = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  const navigate = useNavigate();

  const navigateToCart = () => [navigate("/cart")];
  return (
    <nav>
      <ContentContainer className={styles["nav-container"]}>
        <div className={styles.logo}>
          <Text variant="h2">Brand-Name</Text>
        </div>

        <div className={styles.hamburger} onClick={handleIconClick}>
          {isOpen ? (
            <X size="30" color="fff" />
          ) : (
            <Menu4 size="30" color="fff" />
          )}
        </div>

        <div className={`${styles.links} ${isOpen ? "" : styles.hidden}`}>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.activeLink}` : styles.link
            }
            to="/"
          >
            <Text>Home</Text>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.activeLink}` : styles.link
            }
            to="/services"
          >
            <Text>Services</Text>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.activeLink}` : styles.link
            }
            to="/contact"
          >
            <Text>Contact Us</Text>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.activeLink}` : styles.link
            }
            to="/about"
          >
            <Text variant="p">ABout Us</Text>
          </NavLink>

          <span className={`${styles.link}`} onClick={displayLoginForm}>
            Login
          </span>

          <span className={`${styles.link}`} onClick={displayRegistrationForm}>
            Register
          </span>

          <NavLink to={"/cart"} className={styles.link}>
            <Cart4
              className={styles["shopping-cart-icon"]}
              onClick={navigateToCart}
            />
          </NavLink>
        </div>
      </ContentContainer>
    </nav>
  );
};

export default Navbar;
