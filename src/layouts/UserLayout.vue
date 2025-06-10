<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
//Components
import Menu from '../components/Menu.vue';
//Models
import { MenuElement } from '../models/MenuElement';
import { responsive } from '../mixins/responsive';

const isAuth = useAuthStore();
const {isMobile} = responsive();
const menuPrincipal = ref<MenuElement | null>(null)

menuPrincipal.value = new MenuElement(
  "Menu Principal",
  [
    {text: "All Products", title:"Show all Products", route: {name: "HomeUser", param:"/"}},
    {text: "My Orders", title:"Show all my orders", route: {name: "Orders", param:"orders"}}
  ],
  [],
  true,
  {hasLogo: true, src:"/public/site/logo.svg", alt:"Oldie Molly", width:200, height:59},
  {type: "horizontal", justify: "left"}
);
</script>

<template>
  <header role="banner" class="om_header">
    <div class="om_menu">
      <div class="om_menu_container">
        <Menu  v-if="menuPrincipal" :items="menuPrincipal"></Menu>
        <div class="om_authentification">
          <a href="" class="om_btn om_authentification_btn" role="button" @click="isAuth.logOut($event)">
            <span aria-hidden="true" class="om_icon_exit"></span>
            <p :class="{'sr_only': isMobile}">Sign Out</p>
          </a>
        </div>
      </div>
    </div>
  </header>

  <main class="om_main" role="main">
    <router-view></router-view>
  </main>
  
</template>

<style scoped lang="scss">
  .om_header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    max-width: 100vw;
    background: $header_background;
    border-bottom: #{pxToRem(1)}rem solid rgba($color: $om_black_color, $alpha: 0.08);
    @include rem(height, $header_height);
  }
  .om_main {
    @include rem(padding, $header_height 24);
  }
  .om_menu{
    &_container{
      display:flex;
      align-items:center;
      @include rem(padding, 0 24);
      @include rem(height, $header_height);
    }
  }
  .om_authentification {
    @include rem(margin-left, 24);
    &_btn {
      @include rem(gap, 8);
      p { margin: 0}
      span[class*="om_icon"]{
        @include svgSize(24);
        @include svgColor(#fff);
      }
      
    }
  }

  @media (max-width: $tablet_dimension) {
    .om_authentification {
      margin-left: auto;
    }
  }
</style>