import { tesloApi } from '@/api/tesloApi';
import { type AuthResponse } from '../interfaces/auth.response';
import { isAxiosError } from 'axios';
import type { User } from '../interfaces/user.interface';

interface RegisterError {
  ok: false;
  message: string;
}

interface RegisterSucces {
  ok: true;
  user: User;
  token: string;
}

export const registerActions = async (
  fullName: string,
  email: string,
  password: string,
): Promise<RegisterError | RegisterSucces> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
      fullName,
      email,
      password,
    });
    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response?.status === 401) {
      return {
        ok: false,
        message: 'No se puedo crear el usuario',
      };
    }
    throw new Error('No se pudo realizar el login');
  }
};
