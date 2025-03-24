import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export const usePagination = () => {
  const router = useRoute();

  const page = ref(Number(router.query.page || 1));
  watch(
    () => router.query.page,
    (newPage) => {
      page.value = Number(newPage) || 1;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  );
  return {
    page,
  };
};
