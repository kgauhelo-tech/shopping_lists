import { useEffect } from "react";
import Text from "../../components/Text/Text";
import styles from "./Profile.module.css";

import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { ContentContainer } from "../../components/ContentContainer";
import { fetchUsers } from "../../redux/slices/authSlice";
import { Edit2 } from "reicon-react";
import { useNavigate } from "react-router";

export const Profile = () => {
  const { users, status, error, activeUserId } = useAppSelector(
    (state) => state.users,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const currentUser = users.find((user) => user.id === activeUserId);

  if (status === "loading") return <Text>Loading profile...</Text>;

  if (status === "failed") return <Text>Failed to fetch user: {error}</Text>;

  if (!currentUser) return <Text>No user logged in.</Text>;

  const handleUpdateProfile = () => {
    navigate("/updateProfile");
  };

  return (
    <ContentContainer className={styles.profile}>
      <div className={styles["actions-container"]}>
        <Text variant="h2">Profile</Text>
        <div>
          <button onClick={handleUpdateProfile}>
            <Text style={{ color: "white" }}>Update Details</Text>
          </button>
        </div>
      </div>
      <div className={styles["details-container"]}>
        <Text variant="h2">User Profile</Text>
        <Text>
          <strong>Name:</strong> {currentUser.name}
        </Text>
        <Text>
          <strong>Surname:</strong> {currentUser.surname}
        </Text>
        <Text>
          <strong>Cell Number:</strong> {currentUser.cellNumber}
        </Text>
        <Text>
          <strong>Email:</strong> {currentUser.email}
        </Text>
      </div>
    </ContentContainer>
  );
};
