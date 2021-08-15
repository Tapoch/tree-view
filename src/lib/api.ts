import { BrandItem } from '@/store/state';
import axios from 'axios';

const client = axios.create({
  baseURL:
    process.env.VUE_APP_API_URL ||
    'https://recruting-test-api.herokuapp.com/api/v1/',
});

export const brandAPI = {
  async readItem(id: string): Promise<BrandItem> {
    return (await client.get<BrandItem>(`brand/${id}`)).data;
  },

  async deleteItem(id: string): Promise<null> {
    return (await client.delete(`brand/${id}`)).data;
  },

  async updateItem(
    id: string,
    data: Omit<BrandItem, '_id'>
  ): Promise<BrandItem> {
    return (await client.put<BrandItem>(`brand/${id}`, data)).data;
  },

  async getItems(): Promise<BrandItem[]> {
    return (await client.get<BrandItem[]>('brands')).data;
  },

  async createItem(data: Omit<BrandItem, '_id'>): Promise<BrandItem> {
    return (await client.post<BrandItem>('brands', data)).data;
  },
};
