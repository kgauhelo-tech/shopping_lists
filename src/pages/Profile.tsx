import React, { useEffect } from "react";
import Text from "../components/Text/Text";

import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { ContentContainer } from "../components/ContentContainer";
import { fetchUsers } from "../redux/slices/authSlice";

export const Profile = () => {
  const { users, status, error, activeUserId } = useAppSelector(
    (state) => state.users,
  );
  const dispatch = useAppDispatch();

  const currentUser = users.find((user) => user.id === activeUserId);

  if (status === "loading") return <p>Loading profile...</p>;

  if (!currentUser) return <p>No user logged in.</p>;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <ContentContainer>
      <div>
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
