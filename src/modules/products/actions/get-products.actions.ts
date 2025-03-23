import { tesloApi } from '@/api/tesloApi';
import { type Product } from '../interfaces/product.interface';
import { getProductImageAction } from './get-product-image.action';

export const getProductsActions = async (page: number = 1, limit: number = 10) => {
  try {
    const { data } = await tesloApi.get<Product[]>(
      `/products?limit=${limit}&offset=${page * limit}`,
    );

    return data.map((product) => ({
      ...product,
      images: product.images.map((image) => getProductImageAction(image)),
    }));
  } catch (error) {
    console.log(error);
    throw new Error('Error al obtener productos');
  }
};
