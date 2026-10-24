import { useEffect } from "react";
import Text from "../components/Text/Text";
import styles from "./pages.module.css";

import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { ContentContainer } from "../components/ContentContainer";
import { fetchUsers } from "../redux/slices/authSlice";
import { Edit2 } from "reicon-react";

export const Profile = () => {
  const { users, status, error, activeUserId } = useAppSelector(
    (state) => state.users,
  );
  const dispatch = useAppDispatch();

  const currentUser = users.find((user) => user.id === activeUserId);

  if (status === "loading") return <Text>Loading profile...</Text>;

  if (status === "failed") return <Text>Failed to fetch user {error}</Text>;

  if (!currentUser) return <Text>No user logged in.</Text>;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <ContentContainer>
      <div className={styles["actions-container"]}>
        <button>
          <Edit2 />
          <Text>Update Details</Text>
        </button>
      </div>
      <div className={styles["details-container"]}>
        <Text variant="h2">User Profile</Text>
        <Text>
          <strong>Name:</strong> {currentUser.name}
        </Text>
        <Text>
          <strong>Name:</strong> {currentUser.surname}
        </Text>
        <Text>
          <strong>Name:</strong> {currentUser.cellNumber}
        </Text>
        <Text>
          <strong>Email:</strong> {currentUser.email}
        </Text>
      </div>
    </ContentContainer>
  );
};
