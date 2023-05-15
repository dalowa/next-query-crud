"use client";

import ProductForm from "@/components/ProductForm";
import Products from "@/components/Products";
import Image from "next/image";

export default function Home() {
  return (
    <main className="py-4 px-2 flex flex-col items-center">
      <Products />
    </main>
  );
}
