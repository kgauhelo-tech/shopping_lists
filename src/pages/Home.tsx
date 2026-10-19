import React, { useRef } from "react";
import { Searchbar } from "../components/Search/Searchbar";
import { StockContainer } from "../components/Stock/StockContainer";
import type { Product } from "../App";
import { useNavigate } from "react-router";

type HomeProps = {
  stock: Product[];
  addToCart: (id: number) => void;
};

export const Home: React.FC<HomeProps> = ({ stock, addToCart }) => {
  const searchRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/products?search=${searchRef.current?.value}`);
  };

  return (
    <>
      <Searchbar ref={searchRef} onSearch={handleSearch} />
      <StockContainer stock={stock} addToCart={addToCart} />
    </>
  );
};
