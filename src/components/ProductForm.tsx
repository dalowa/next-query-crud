import React, { FormEvent } from "react";
import {
  useMutation,
  useQueryClient,
  QueryClient,
  hashQueryKey,
} from "@tanstack/react-query";
import { createProduct } from "@/api/productAPI";

export default function ProductForm() {
  const queryClient = useQueryClient();

  const addProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      console.log("it works");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const product = Object.fromEntries(formData);
    console.log(product);
    addProductMutation.mutate({
      ...product,
      inStock: true,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input className="text-black p-1" id="name" type="text" name="name" />

      <label htmlFor="description">Description</label>
      <input
        className="text-black p-1"
        id="description"
        type="text"
        name="description"
      />

      <label htmlFor="price">Price</label>
      <input className="text-black p-1" id="price" type="text" name="price" />

      <button type="submit">Add Product</button>
    </form>
  );
}
