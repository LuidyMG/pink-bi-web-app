import { AxiosService } from "./AxiosService";

import { Product } from "./models/Product";

const axiosService = new AxiosService();
const axios = axiosService.getInstance();

export class ProductService {
    async create(newProduct : Product)
    {
        return await axios.post('/product', newProduct);
    }

    async getById(productId: string)
    {
        return await axios.get(`/product/${productId}`);
    }
}