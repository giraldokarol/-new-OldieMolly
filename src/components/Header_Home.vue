<script setup lang="ts">
const {info} = defineProps(["info"]);
</script>

<template>
    <div class="om_bigtitle_container">
        <div class="om_bigtitle_image">
            <span class="om_icon_bee icon_large" 
            :class="{'om_yllback_def': info.name == 'Login' , 'om_orangback_def':info.name == 'Sign Up'}"
            aria-hidden="true"></span>
        </div>
        <h1 class="om_bigtitle_text">{{info.title}}</h1>
        <p class="om_gigtitle_description">{{ info.description }}</p>
    </div>
</template>

<style scoped lang="scss">
.om_bigtitle {
    &_image{
        @include rem(margin-bottom, 30);
        span[class^="om_icon"]{
            align-items: center;
            justify-content: center;
            @include svgSize(52);
            @include svgColor($om_orange_color1);
        }
    }
}
</style>
