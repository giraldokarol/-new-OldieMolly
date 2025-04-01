<script setup lang="ts">
const {info} = defineProps(["info"]);
</script>

<template>
    <div class="om_bigtitle_container">
        <div class="om_bigtitle_image">
            <span class="om_icon_bee icon_large" 
            :class="{'om_yllback_def': info.id == 'Login' , 'om_orangback_def':info.id == 'Sign Up'}"
            aria-hidden="true"></span>
        </div>
        <h1 class="om_bigtitle_text">{{info.title}}</h1>
        <p class="om_bigtitle_description">{{ info.description }}</p>
    </div>
</template>

<style scoped lang="scss">
.om_bigtitle {
    &_image{
        @include rem(margin-bottom, 16);
        span[class^="om_icon"]{
            align-items: center;
            justify-content: center;
            @include svgSize(40);
            &.om_yllback_def{
                @include svgColor($om_orange_color1);
            }
            &.om_orangback_def{
                @include svgColor($om_yellow_color);
            }
        }
    }

    &_text{
        font-weight: 900;
        line-height: 1;
        @include rem(font-size, 32);
        @include rem(margin-bottom, 20);
    }
    
    &_description{
        white-space: pre-line;
    }

    @media screen and (max-width:920px) {
        &_image {display: none;}
        &_text {
            @include rem(font-size, 30);
            text-align: center;
        }
    }
}
</style>
