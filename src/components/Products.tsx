import { deleteProduct, getProducts, updateProduct } from "@/api/productAPI";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { StringLiteral } from "typescript";
import TechProduct from "./TechProduct";

interface techProduct {
  nombre: string;
  descripcion: string;
  marca: string;
  precio: number;
  id: number;
}

export default function Products() {
  const queryClient = useQueryClient();
  const { isLoading, data, isError, error } = useQuery<techProduct[]>({
    queryKey: ["products"],
    queryFn: getProducts,
    /* select: (products) => products.sort((a, b) => b.id - a.id), */
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      console.log("it works");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>Error</div>;

  return (
    <>
      <h1 className="text-4xl m-4">Tech Products</h1>
      <section className="flex gap-5 max-w-7xl flex-wrap items-center justify-center">
        {data.map((product) => (
          <TechProduct
            name={product.nombre}
            description={product.descripcion}
            brand={product.marca}
            price={product.precio}
            key={product.id}
            id={product.id}
          />
        ))}
        {/* <TechProduct
        name={data[0].nombre}
        description={data[0].descripcion}
        brand={data[0].marca}
        price={data[0].precio}
        key={data[0].id}
      /> */}
      </section>
    </>
  );
}
