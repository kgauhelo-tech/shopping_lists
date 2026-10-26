import { NavLink } from "react-router";
import styles from "./Navbar.module.css";
import Text from "../Text/Text";
import { useState } from "react";

import { Menu4, ProfileCircle, X } from "reicon-react";
import { ContentContainer } from "../ContentContainer";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIconClick = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  return (
    <nav>
      <ContentContainer className={styles["glass-effect"]}>
        <div className={styles["nav-container"]}>
          <div className={styles.logo}>
            <Text variant="h2">List-It!</Text>
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
              to="/login"
            >
              <Text>Login</Text>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.activeLink}` : styles.link
              }
              to="/register"
            >
              <Text>Register</Text>
            </NavLink>

            <NavLink
              to={"/profile"}
              className={({ isActive }) =>
                isActive
                  ? `${styles.link} ${styles.activeProfileLink} ${styles.profile}`
                  : `${styles.link} ${styles.profile}`
              }
            >
              {isOpen ? (
                <Text>Profile</Text>
              ) : (
                <ProfileCircle className={styles["profile-icon"]} />
              )}
            </NavLink>
          </div>
        </div>
      </ContentContainer>
    </nav>
  );
};

export default Navbar;
