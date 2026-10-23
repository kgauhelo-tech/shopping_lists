import { useRef, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router";

import { Button } from "../../components/Input/Button";
import { TextInput } from "../../components/Input/TextInput";
import Text from "../../components/Text/Text";
import styles from "./Auth.module.css";
import { addUser } from "../../redux/slices/authSlice";
import type { user } from "../../types/types";

export const Register = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const surnameRef = useRef<HTMLInputElement>(null);
  const cellNumberRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleValidation = async (e: React.FormEvent) => {
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

    const newUser: user = {
      id: crypto.randomUUID(),
      name,
      surname,
      cellNumber,
      email,
      password,
    };

    await handleRegistration(newUser);
  };

  const handleRegistration = async (newUser: user) => {
    try {
      setIsLoading(true);
      await dispatch(addUser(newUser)).unwrap();

      navigate("/login");
    } catch (err) {
      setErrorMessage("Registration failed. Email might already be in use.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles["reg-container"]}>
      <form className={styles["reg-content"]} onSubmit={handleValidation}>
        <div className={styles["left-container"]}>
          <Text variant="h2">Register</Text>
          <Text>Pleased to have you!</Text>

          <Text style={{ color: "#fff", opacity: 0.8 }}>
            By signing up, you accept our <span>Terms and conditions</span>
          </Text>
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
            value={isLoading ? "Registering..." : "Register"}
            style={{ opacity: isLoading ? 0.7 : 1 }}
          />
        </div>
      </form>
    </div>
  );
};
