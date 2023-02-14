import axios from 'axios';
import { endpoint } from '@/utils/paths';

export const getData = async (path: string, id?: string) => {
  try {
    if (id) {
      const res = await axios.get(`${endpoint.baseApiUrl}${path}${id}`);
      const data =  await res.data;

      return data;
    }

    const res = await axios.get(`${endpoint.baseApiUrl}${path}`);
    const data =  await res.data;

    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return(err?.response?.data as string ?? 'Something went wrong...');
    }
    return('Something went wrong...');
  }
};
