import { Route, Routes } from "react-router";
import "./App.css";
import PageNotFound from "./pages/404/PageNotFound";
import { Profile } from "./pages/Profile/Profile";
import { Register } from "./pages/Auth/Register";
import { Login } from "./pages/Auth/Login";
import { Home } from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import { ListDetails } from "./pages/Lists/ListDetails";
import { AddList } from "./pages/Lists/AddList";
import { AddListItem } from "./pages/ListItem/AddListItem";
import { ProtectedRoute } from "./ProtectedRoutes";
import { EditList } from "./pages/Lists/EditList";
import { UpdateProfile } from "./pages/Profile/UpdateProfile";

function App() {
  return (
    <>
      <div id="app-container">
        <Navbar />

        <div id="scrollable">
          <Routes>
            <Route index element={<Home />} />
            <Route path="addList" element={<AddList />} />
            <Route path="lists/:id" element={<ListDetails />} />
            <Route path="editList/:id" element={<EditList />} />
            <Route path="lists/:id/addItem" element={<AddListItem />} />
            {/* <Route path="editList/:id" element={<EditList />} /> */}

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/updateProfile" element={<UpdateProfile />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
