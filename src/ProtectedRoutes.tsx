import { Navigate, Outlet, useLocation } from "react-router";
import { useAppSelector } from "./redux/hooks";

export const ProtectedRoute = () => {
  const activeUserId = useAppSelector((state) => state.users.activeUserId);
  const location = useLocation();

  const isLoggedIn = Boolean(activeUserId);

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate
      to={`/login?redirectTo=${encodeURIComponent(location.pathname)}`}
      replace
    />
  );
};
