<script lang="ts" setup>
import { useAuthStore } from '../stores/authStore';
import Tag from '../components/Tag.vue';

const isAuth = useAuthStore();
</script>

<template>
    <div class="om_home_title_container">
        <div class="om_home_title">
            <h1>Hi {{ isAuth.user.userName }}</h1>
            <p class="om_home_title_sub">
                Welcome back! Everything is set up for you. Feel free to shop for anything you need.
            </p>
        </div>
        <div class="om_home_search">
            <form autocomplete="off" name="form_search" role="search" id="form_search" class="om_search_form">
                <label for="search_input" class="sr_only">Search a product</label>
                <input type="text" id="search_input" class="om_searh_input" title="Search a product on the list" placeholder="Search a product">
                <button type="submit" title="Go to search the product" class="om_search_btn">
                    <span class="sr_only"> Go to search the product</span>
                    <span aria-hidden="true" class="om_icon_search"></span>
                </button>
            </form>
        </div>
    </div>
    <div class="om_home_filters_container">
        <Tag icon="om_icon_all" text="All our products"></Tag>
        <Tag icon="om_icon_stroller" text="Mobility Products"></Tag>
        <Tag icon="om_icon_crib" text="Room Products"></Tag>
        <Tag icon="om_icon_cartoy" text="Toys"></Tag>
        <Tag icon="Clothes" text="Clothes"></Tag>
    </div>
</template>