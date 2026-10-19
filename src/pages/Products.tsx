import React, { useEffect, useRef } from "react";
import { Searchbar } from "../components/Search/Searchbar";
import { StockContainer } from "../components/Stock/StockContainer";
import type { Product } from "../App";
import { useNavigate, useSearchParams } from "react-router";

type ProductsProps = {
  stock: Product[];
  addToCart: (id: number) => void;
};

export const Products: React.FC<ProductsProps> = ({ stock, addToCart }) => {
  const searchRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const handleSearch = () => {
    navigate(`/products?search=${searchRef.current?.value}`);
  };

  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    // params.search;
    //fetch products using params.search
  }, [searchParams]);

  return (
    <>
      {/* <Searchbar ref={ null } onSearch={() => {}} /> */}
      <StockContainer stock={stock} addToCart={addToCart} />
    </>
  );
};
