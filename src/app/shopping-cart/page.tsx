"use client";

import { getProductsCart } from "@/api/productAPI";
import TechProduct from "@/components/TechProduct";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface techProduct {
  nombre: string;
  descripcion: string;
  marca: string;
  precio: number;
  id: number;
}

export default function ShoppingCart() {
  const { isLoading, data, isError, error } = useQuery<techProduct[]>({
    queryKey: ["products"],
    queryFn: getProductsCart,
    /* select: (products) => products.sort((a, b) => b.id - a.id), */
  });

  return (
    <section className="flex gap-5 max-w-7xl flex-wrap items-center justify-center">
      {data?.map((product) => (
        <TechProduct
          name={product.nombre}
          description={product.descripcion}
          brand={product.marca}
          price={product.precio}
          id={product.id}
          key={product.id}
        ></TechProduct>
      ))}
    </section>
  );
}
