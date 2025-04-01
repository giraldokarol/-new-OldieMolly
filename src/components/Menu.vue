<script lang="ts" setup>
import { RouterLink } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const props = defineProps(["items"])
const sesion = useAuthStore();

</script>

<template>
    <nav  role="navigation" :aria-label="props.items.aria">
        <button v-if="props.items.hasBurger" type="button" aria-expanded="false" class="om_burgerbutton">
            <span class="om_burgerbutton_icon" aria-hidden="true"></span>
            <span class="om_burgerbutton_text">Menu</span>
        </button>
        <ul>
            <li v-for="item in props.items.links" class="om_menu_item">
                <router-link :to="{name:item.route.name, params:{userName: item.route.param}}">{{ item.text }}</router-link>
            </li>
        </ul>

        <div class="om_menu_actions" v-if="props.items.cta.length > 0">
            "Hola"
        </div>
    </nav>
</template>

<style lang="scss" scoped></style>