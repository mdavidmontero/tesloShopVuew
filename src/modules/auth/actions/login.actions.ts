import { tesloApi } from '@/api/tesloApi';
import { type AuthResponse } from '../interfaces/auth.response';
import { isAxiosError } from 'axios';
import type { User } from '../interfaces/user.interface';

interface LoginError {
  ok: false;
  message: string;
}

interface LoginSuccess {
  ok: true;
  user: User;
  token: string;
}

export const loginActions = async (
  email: string,
  password: string,
): Promise<LoginError | LoginSuccess> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/login', {
      email,
      password,
    });
    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return {
        ok: false,
        message: 'Email o contraseña incorrectos',
      };
    }
    throw new Error('No se pudo realizar el login');
  }
};
