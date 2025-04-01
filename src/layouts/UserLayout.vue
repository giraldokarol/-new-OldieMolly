<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import Menu from '../components/Menu.vue';
//Models
import { MenuElement } from '../models/MenuElement';

const isAuth = useAuthStore();
const menuPrincipal = ref<MenuElement | null>(null)

function updatedMenu() {
  menuPrincipal.value = new MenuElement(
    "Menu Principal",
    [
      {text: "All Products", title:"Show all Products", route: {name: "HomeUser", param:"/"}},
      {text: "My Orders", title:"Show all my orders", route: {name: "Orders", param:"orders"}}
    ],
    [],
    true
  )
}

onMounted(() =>{
  if (isAuth.isAuthenticated) {
    isAuth.fetchUserData().then(() => {
      updatedMenu();
    }).catch(error => {
      console.error("Error fetching user data:", error);
    });
  }
});
</script>

<template>
  <header role="banner">
    <div class="om_menu">
      <div class="om_menu_container" v-if="isAuth.isAuthenticated">
        <Menu  v-if="menuPrincipal" :items="menuPrincipal"></Menu>
        <div class="om_authentification">
          <a @click="isAuth.logOut">Cerrar Sesion</a>
        </div>
      </div>
    </div>
  </header>

  <router-view></router-view>
</template>

<style scoped lang="scss">
</style>