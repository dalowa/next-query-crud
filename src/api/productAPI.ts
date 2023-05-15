import axios from 'axios';



const productsAPI = axios.create({
    baseURL: 'http://localhost:5173'
})

export const getProducts = async ( ) => {
  const res =  await productsAPI.get('/products')
  return res.data
};

export const createProduct = (producto:any) => productsAPI.post('/products', producto);


export const deleteProduct = (id:number) => productsAPI.delete(`/products/${id}`)

export const updateProduct = (producto:any) => productsAPI.put(`/products/${producto.id}`, producto)


export const getProductsCart = async ( ) => {
  const res =  await productsAPI.get('/shopping')
  return res.data
};

export const createItemShoppingCart = (producto: any) => productsAPI.post('/shopping', producto)