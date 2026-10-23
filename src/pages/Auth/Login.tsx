import { useEffect, useRef, useState } from "react";
import { TextInput } from "../../components/Input/TextInput";
import Text from "../../components/Text/Text";
import styles from "./Auth.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router";
import { fetchUsers, setActiveUser } from "../../redux/slices/authSlice";

export const Login = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { users, status, error } = useAppSelector((state) => state.users);
  const handleValidation = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage(null);
    const password = passwordRef.current?.value?.trim() || "";
    const email = emailRef.current?.value?.trim() || "";

    const errors: string[] = [];
    if (!password) errors.push("Password must be at least 8 characters long");
    if (!email) errors.push("Email must not be empty");

    if (errors.length > 0) {
      setErrorMessage(errors.join("\n"));
      return;
    }

    handleLogin(email, password);
  };

  const handleLogin = (email: string, password: string) => {
    setIsLoading(true);

    const currentUser = users.find(
      (user) => user.email === email && user.password === password,
    );

    setIsLoading(false);

    if (!currentUser) {
      setErrorMessage("Invalid email or password");
      return;
    }

    dispatch(setActiveUser(currentUser.id));

    setErrorMessage(null);
    navigate("/home");
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  if (status === "loading")
    return <Text>Loading user authentication information</Text>;

  return (
    <form onSubmit={handleValidation} className={styles["login-container"]}>
      <div className={styles["login-content"]}>
        <div className={styles["text-container"]}>
          <Text variant="h2">Login</Text>
          <Text>Welcome back!</Text>
        </div>
        <div className={styles["input-container"]}>
          <div>
            <TextInput
              inputRef={emailRef}
              label="Email"
              placeholder="example@email.com"
              style={{
                backgroundColor: "#04284d",
                display: "flex",
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "16px",
              }}
            />
          </div>

          <div>
            <TextInput
              inputRef={passwordRef}
              label="Password"
              placeholder="●●●●●●●●●●"
              style={{
                backgroundColor: "#04284d",
                display: "flex",
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "16px",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              marginTop: "20px",
              backgroundColor: "white",
              color: "#07407d",
              height: "40px",
            }}
          >
            <Text>{isLoading ? "Logging in" : "Login"}</Text>
          </button>
        </div>
        {errorMessage && <Text>{errorMessage}</Text>}
      </div>
    </form>
  );
};
