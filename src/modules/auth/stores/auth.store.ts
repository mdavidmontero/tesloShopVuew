import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { type User } from '../interfaces/user.interface';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { loginActions } from '../actions/login.actions';
import { useLocalStorage } from '@vueuse/core';
import { registerActions } from '../actions/register.actions';
import { checkAuthAction } from '../actions/check-auth.actions';

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref<AuthStatus>(AuthStatus.Checking);
  const user = ref<User | undefined>();
  const token = ref(useLocalStorage('token', ''));

  const login = async (email: string, password: string) => {
    try {
      const loginResponse = await loginActions(email, password);
      if (!loginResponse.ok) {
        logout();
        return false;
      }
      user.value = loginResponse.user;
      token.value = loginResponse.token;
      authStatus.value = AuthStatus.Authenticated;
      return true;
    } catch (error) {
      console.log(error);
      return logout();
    }
  };

  const register = async (fullName: string, email: string, password: string) => {
    try {
      const registerResponse = await registerActions(fullName, email, password);
      if (!registerResponse.ok) {
        logout();
        return {
          ok: false,
          message: registerResponse.message,
        };
      }
      user.value = registerResponse.user;
      token.value = registerResponse.token;
      authStatus.value = AuthStatus.Authenticated;
      return {
        ok: true,
        message: 'Usuario creado',
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: 'No se pudo crear el usuario',
      };
    }
  };

  const logout = () => {
    authStatus.value = AuthStatus.Unauthenticated;
    user.value = undefined;
    token.value = '';
    return false;
  };

  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const statusResponse = await checkAuthAction();
      if (!statusResponse.ok) {
        logout();
        return false;
      }
      user.value = statusResponse.user;
      token.value = statusResponse.token;
      authStatus.value = AuthStatus.Authenticated;
      return true;
    } catch (error) {
      console.log(error);
      logout();
      return false;
    }
  };

  return {
    user,
    token,
    authStatus,

    // getters
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),
    isUnauthenticated: computed(() => authStatus.value === AuthStatus.Unauthenticated),
    isAdmin: computed(() => user.value?.roles.includes('admin') ?? false),
    username: computed(() => user.value?.fullName),
    login,
    register,
    logout,
    checkAuthStatus,
  };
});
