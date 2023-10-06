<script setup lang="ts">
  import { useHead } from '@vueuse/head';
  import TheHeaderBlock from '@/components/functional/TheHeaderBlock.vue';

  useHead({
    title: 'Fulfillment',
    meta: [
      {
        name: 'viewport',
        content:
          'user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi',
      },
    ],
    link: [],
  });
</script>

<template>
  <main>
    <the-header-block />
  </main>
</template>
