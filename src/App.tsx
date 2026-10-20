import { Route, Routes } from "react-router";
import "./App.css";
import PageNotFound from "./pages/404/PageNotFound";
import { Profile } from "./pages/Profile";
import { Register } from "./pages/Auth/Register";
import { Login } from "./pages/Auth/Login";
import { Home } from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import { ListCard } from "./components/List/ListCard";

function App() {
  return (
    <>
      <div id="app-container">
        <Navbar />

        <div id="scrollable">
          <Routes>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />

            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
