import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { fetchUsers, updateUser } from "../../redux/slices/authSlice"; // Make sure updateUser is imported from your auth slice
import styles from "./Profile.module.css";
import Text from "../../components/Text/Text";
import { TextInput } from "../../components/Input/TextInput";
import { Button } from "../../components/Input/Button";

export const UpdateProfile = () => {
  const { users, status, error, activeUserId } = useAppSelector(
    (state) => state.users,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const surnameRef = useRef<HTMLInputElement>(null);
  const cellNumberRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const currentUser = users.find((user) => user.id === activeUserId);

  // Pre-fill input fields once currentUser is loaded
  useEffect(() => {
    if (currentUser) {
      if (nameRef.current) nameRef.current.value = currentUser.name;
      if (surnameRef.current) surnameRef.current.value = currentUser.surname;
      if (cellNumberRef.current)
        cellNumberRef.current.value = currentUser.cellNumber;
      if (emailRef.current) emailRef.current.value = currentUser.email;
      if (passwordRef.current)
        passwordRef.current.value = currentUser.password || "";
    }
  }, [currentUser]);

  if (status === "loading") return <Text>Loading profile...</Text>;
  if (status === "failed") return <Text>Failed to fetch user: {error}</Text>;
  if (!currentUser) return <Text>No user logged in.</Text>;

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const name = nameRef.current?.value?.trim() || "";
    const surname = surnameRef.current?.value?.trim() || "";
    const cellNumber = cellNumberRef.current?.value?.trim() || "";
    const email = emailRef.current?.value?.trim() || "";
    const password = passwordRef.current?.value?.trim() || "";

    const errors: string[] = [];
    if (!name) errors.push("Name is required");
    if (!surname) errors.push("Surname is required");
    if (!cellNumber) errors.push("Cell Number is required");
    if (!email) errors.push("Email is required");
    if (!password || password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }

    if (errors.length > 0) {
      setErrorMessage(errors.join("\n"));
      return;
    }

    try {
      setIsLoading(true);
      await dispatch(
        updateUser({
          ...currentUser,
          name,
          surname,
          cellNumber,
          email,
          password,
        }),
      ).unwrap();
      navigate(-1);
    } catch (err) {
      console.error("Failed to update profile:", err);
      setErrorMessage("Failed to update profile on the server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles["reg-container"]}>
      <form className={styles["reg-content"]} onSubmit={handleUpdateSubmit}>
        <div className={styles["left-container"]}>
          <Text variant="h2">Update Profile</Text>
          <Text>Keep your account details up to date.</Text>
        </div>

        <div className={styles["right-container"]}>
          <TextInput
            style={{
              backgroundColor: "#04284d",
              display: "flex",
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "16px",
            }}
            inputRef={nameRef}
            label="Name"
            name="firstName"
          />

          <TextInput
            style={{
              backgroundColor: "#04284d",
              display: "flex",
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "16px",
            }}
            inputRef={surnameRef}
            label="Surname"
            name="surname"
          />

          <TextInput
            style={{
              backgroundColor: "#04284d",
              display: "flex",
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "16px",
            }}
            inputRef={cellNumberRef}
            label="Phone Number"
            name="phoneNumber"
          />

          <TextInput
            style={{
              backgroundColor: "#04284d",
              display: "flex",
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "16px",
            }}
            inputRef={emailRef}
            label="Email"
          />

          <TextInput
            style={{
              backgroundColor: "#04284d",
              display: "flex",
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "16px",
            }}
            isTextObscured={true}
            inputRef={passwordRef}
            label="Password"
            name="password"
          />

          {errorMessage && (
            <div
              style={{
                color: "#ff6b6b",
                whiteSpace: "pre-line",
                fontSize: "14px",
                margin: "10px 0",
              }}
            >
              {errorMessage}
            </div>
          )}

          <Button
            value={isLoading ? "Updating..." : "Update"}
            style={{ opacity: isLoading ? 0.7 : 1 }}
          />
        </div>
      </form>
    </div>
  );
};
