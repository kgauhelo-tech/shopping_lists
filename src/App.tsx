import { Route, Routes } from "react-router";
import { Footer } from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import { useState } from "react";
import { Computer, Laptop, Phone } from "reicon-react";
import { Login } from "./components/Auth/Login";
import { Register } from "./components/Auth/Register";
import { Home } from "./pages/Home";
import PageNotFound from "./pages/404/PageNotFound";
import { ContactUs } from "./pages/ContactUs";
import { Products } from "./pages/Products";
import { Cart } from "./pages/Cart";
import { ProductDetails } from "./pages/ProductDetails";

export type Product = {
  name: string;
  icon: any;
  desc: string;
  price: number;
  id: number;
};

function App() {
  const [stock, setStock] = useState<Product[]>([
    {
      name: "Mac",
      icon: <Computer size={150} />,
      desc: "Just a mac book",
      price: 20000,
      id: 1,
    },
    {
      name: "iPhone7",
      icon: <Phone size={150} />,
      desc: "Iphone 7 with high specs",
      price: 20000,
      id: 2,
    },
    {
      name: "Mac",
      icon: <Laptop size={150} />,
      desc: "Latest mac",
      price: 20000,
      id: 3,
    },
    {
      name: "Mac",
      icon: <Laptop size={150} />,
      desc: "Latest mac",
      price: 20000,
      id: 3,
    },
  ]);

  const [cart, setCart] = useState<Product[]>();

  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const addToCart = (id: number) => {};

  return (
    <>
      <div id="app-container">
        <div id="scrollable">
          <Login
            isVisible={showLoginForm}
            close={() => {
              setShowLoginForm(false);
            }}
          />
          <Register isVisible={showRegistrationForm} close={close} />
          <Navbar
            displayLoginForm={() => {
              setShowLoginForm(true);
            }}
            displayRegistrationForm={() => {
              setShowRegistrationForm(true);
            }}
          />
          <Routes>
            <Route
              index
              element={<Home stock={stock} addToCart={addToCart} />}
            />
            <Route path="contact" element={<ContactUs />} />
            <Route path="products">
              <Route
                index
                element={<Products stock={stock} addToCart={addToCart} />}
              />
              <Route
                path=":id"
                element={<ProductDetails stock={stock} addToCart={addToCart} />}
              />
            </Route>
            <Route path="cart" element={<Cart />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default App;
