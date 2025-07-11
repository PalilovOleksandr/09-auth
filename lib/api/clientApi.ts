import { registerRequest, User } from '@/types/user';
import { nextServer } from './api';

export const register = async (dataUser: registerRequest): Promise<User> => {
  try {
    const { data } = await nextServer.post<User>('/auth/register', dataUser);
    return data;
  } catch {
    throw new Error('Unable to register user. Please try again.');
  }
};
