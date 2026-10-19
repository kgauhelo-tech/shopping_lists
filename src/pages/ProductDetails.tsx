import React, { useEffect, useRef } from "react";
import type { Product } from "../App";
import { Searchbar } from "../components/Search/Searchbar";
import { StockContainer } from "../components/Stock/StockContainer";
import { useNavigate, useParams } from "react-router";

import Text from "../components/Text/Text";

type ProductDetailsProps = {
  stock: Product[];
  addToCart: (id: number) => void;
};

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  stock,
  addToCart,
}) => {
  const searchRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    // This is to grab the data form the parameter that was passed
    console.log({ params });
    console.log(params.id);

    // logic to fetch data assigned to the resource
  }, [params]);

  const handleSearch = () => {
    navigate(`/products?search=${searchRef.current?.value}`);
  };

  return (
    <>
      <Searchbar ref={searchRef} onSearch={handleSearch} />

      <Text>Product Details</Text>
      <StockContainer stock={stock} addToCart={addToCart} />
    </>
  );
};
