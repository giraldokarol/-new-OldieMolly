<script setup lang="ts">
import {useAuthStore} from './stores/authStore';
import AuthLayout from './layouts/AuthLayout.vue';
import UserLayout from './layouts/UserLayout.vue';
import { onMounted } from 'vue';

const auth = useAuthStore();

onMounted(() => {
  console.log('Componente montado');
});
  

</script>

<template>
  <main role="main" class="om_content">
      <RouterView />
  </main>
</template>