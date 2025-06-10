<script setup lang="ts">
import { ref } from 'vue';

const isPressed = ref<boolean>(false);
const ariaText = ref<string>("Add to favorites");

function addToFavorite(){
    if(isPressed.value) {
        isPressed.value = false;
        ariaText.value = "Add to favorites";
    }else {
        isPressed.value = true;
        ariaText.value = "Remove from favorites";
    }
}
</script>

<template>
    <button :aria-label="ariaText" :aria-pressed="isPressed" @click="addToFavorite" class="om_favorite_btn" :class="{'selected' : isPressed}">
        <span aria-hidden="true" class="om_icon_heart om_favorite_btn_icon"></span>
    </button>
</template>

<style scoped lang="scss">
.om_favorite_btn {
    cursor: pointer;
    background: #FFF;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 #{pxToRem(8)}rem #{pxToRem(4)}rem rgba(0,0,0,0.05);
    transition: all 0.2s ease;
    @include rem(width, 45);
    @include rem(height, 45);
    @include rem(border-radius, 50);
    &_icon {
        @include svgSize(24);
        @include svgColor($om_orange_color);
    }
    &.selected, &:hover {
        background: $om_orange_color;
        .om_favorite_btn_icon {
            @include svgColor(#FFF);
        }
    }
}
</style>