import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';

const isAdminGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();
  await authStore.checkAuthStatus();
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  authStore.isAdmin ? next() : next({ name: 'home' });
};

export default isAdminGuard;
