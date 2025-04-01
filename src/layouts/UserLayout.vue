<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import Menu from '../components/Menu.vue';
//Models
import { MenuElement } from '../models/MenuElement';

const isAuth = useAuthStore();
const menuPrincipal = ref<MenuElement | null>(null)
const isUserFetched = ref(false);

console.log("AuthLayout montado");
function updatedMenu() {
}

onMounted(() =>{
  if (isAuth.isAuthenticated) {
    isAuth.fetchUserData().then(() => {
      isUserFetched.value = true;
      updatedMenu();
    }).catch(error => {
      console.error("Error fetching user data:", error);
    });
  }
  console.log("Hola soy Users.vue")
});
</script>

<template>
  <header role="banner">
    <div class="om_menu">
      <div class="om_menu_container" v-if="isAuth.isAuthenticated && isUserFetched">
        <Menu  v-if="menuPrincipal" :items="menuPrincipal"></Menu>
        <div class="om_authentification">
          <a @click="isAuth.logOut">Cerrar Sesion</a>
        </div>
      </div>
    </div>
  </header>

    <h1>Hola Mundo</h1>
</template>

<style scoped lang="scss"></style>