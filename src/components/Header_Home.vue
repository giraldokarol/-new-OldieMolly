<script setup lang="ts">

const {info} = defineProps(["info"]);


</script>

<template>
    <div class="om_bigtitle_container">
        <div class="om_big_title_image">
            <span class="bee_icon icon_large" 
            :class="{'om_yllback_def': info.name == 'Login' , 'om_orangback_def':info.name == 'Sign Up'}"
            aria-hidden="true"></span>
        </div>
        <h1 class="om_bigtitle_text">{{info.title}}</h1>
        <p class="om_gigtitle_description">{{ info.description }}</p>
    </div>
</template>
