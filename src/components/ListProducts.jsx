import storageService from "@/appwrite/storage";
import React, { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import ProductCard from "./ProductCard";

const ListProducts = ({ slug = "products" }) => {
  const [products, setProducts] = useState({
    products: [],
    loading: true,
  });

  useEffect(() => {
    storageService
      .getProducts()
      .then((response) => {
        if (response.documents.length > 0) {
          setProducts((prevState) => ({
            ...prevState,
            products: response.documents,
          }));
        }
      })
      .finally(() => {
        setProducts((prevState) => ({
          ...prevState,
          loading: false,
        }));
      });
  }, []);

  return (
    <div className="w-full h-full flex flex-wrap gap-4">
      {products.loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <PulseLoader color="white" />
        </div>
      ) : products.products.length ? (
        products.products.map((product, index) => (
          <ProductCard key={index} {...product} slug={slug} />
        ))
      ) : (
        <div>No Products found!</div>
      )}
    </div>
  );
};

export default ListProducts;
