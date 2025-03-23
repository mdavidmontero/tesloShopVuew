<template>
  <div class="flex justify-center py-10 bg-gray-100 gap-2">
    <button
      :disabled="isFisrtPage"
      @click="$router.push({ query: { page: page - 1 } })"
      class="flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-white bg-blue-600 disabled:bg-gray-300 transition-all hover:bg-blue-700"
    >
      <ArrowLeftIcon />
      <span>Anteriores</span>
    </button>
    <button
      :disabled="hasMoreData"
      @click="$router.push({ query: { page: page + 1 } })"
      class="flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-white bg-blue-600 disabled:bg-gray-300 transition-all hover:bg-blue-700"
    >
      <span>Siguientes</span>
      <ArrowRightIcon />
    </button>
  </div>
</template>
<script setup lang="ts">
import ArrowLeftIcon from '@/icons/ArrowLeftIcon.vue';
import ArrowRightIcon from '@/icons/ArrowRightIcon.vue';

interface Props {
  page: number;
  isFisrtPage: boolean;
  hasMoreData: boolean;
}

defineProps<Props>();
</script>
