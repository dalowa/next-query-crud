import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { createItemShoppingCart, createProduct } from "../api/productAPI";

interface techProduct {
  name: string;
  description: string;
  brand: string;
  price: number;
  id: number;
}

export default function TechProduct({
  name,
  description,
  brand,
  price,
  id,
}: techProduct) {
  const queryClient = useQueryClient();

  const addToCart = useMutation({
    mutationFn: createItemShoppingCart,
    onSuccess: () => {
      console.log("it works");
      queryClient.invalidateQueries({ queryKey: ["shopping"] });
    },
  });

  const addShoppingCart = () => {
    addToCart.mutate({
      nombre: name,
      descripcion: description,
      marca: brand,
      precio: price,
      id: id,
    });
  };

  return (
    <article className="flex w-full max-w-sm border-black border-2 p-2 justify-between items-center h-44">
      <header className="max-w-xs flex flex-col items-center">
        <h1>{name}</h1>
        <p className="text-center">{description}</p>
        <span className="text-green-500">{`$${price}`}</span>
        <button
          onClick={addShoppingCart}
          className="p-2 border-black border-2 w-60 hover:border-white hover:bg-black hover:text-white transition-colors"
        >
          Add to Shopping Cart
        </button>
      </header>
      <footer className="relative w-12 h-14 flex justify-center">
        <Image
          src={`https://raw.githubusercontent.com/dalowa/next-query-crud/17de642436b1aa14afdfc64116db0e8fc643ea30/public/${brand}.svg`}
          alt={brand}
          fill={true}
        />
      </footer>
    </article>
  );
}
