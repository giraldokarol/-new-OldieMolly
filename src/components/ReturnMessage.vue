<script lang="ts" setup>
import { computed } from 'vue';
import DOMPurify from 'dompurify';

const props = defineProps(["message"]);
const messageText = computed(() => {
    if(props.message?.text) {
        const newText = props.message.text;
        if(containsHTML(newText)){
            return sanitizeHTML(newText);
        }else{
            return newText;
        }
    }
});

//If contains HTML
function containsHTML(text: string): boolean {
    const regex = /<\/?[a-z][\s\S]*>/i;
    return regex.test(text);
}

//Sanitize DOM
function sanitizeHTML(text:string):string {
    return DOMPurify.sanitize(text);
}
</script>

<template>
    <div class="om_bloc_message" :class="{'error': message.type =='error', 'info' : message.type == 'info', 'warning' : message.type == 'warn', 'sucess': message.type == 'sucess'}">
        <span  :class="{'om_icon_info' : message.type == 'info', 'om_icon_error': message.type == 'error', 'om_icon_sucess': message.type =='sucess', 'om_icon_alert' : message.type == 'warn'}" class="om_bloc_message_icon" aria-hidden="true"></span>
        <p v-html="messageText"></p>
    </div>
</template>

<style scoped lang="scss">
    @mixin colorMessage($bg, $border_color, $icon_color){
        background: $bg;
        border: #{pxToRem(1)}rem solid $border_color;
        .om_bloc_message_icon {
            @include svgColor($icon_color);
        }
    }

    .om_bloc_message {
        display: flex;
        @include rem(padding, 12);
        @include rem(margin, 12 0);
        @include rem(gap, 8);
        @include rem(border-radius, 8);
        &_icon {
            @include rem(padding, 3 0);
            @include svgSize(24);
        }

        &.error {
            @include colorMessage($om_red_color1, $om_red_color, $om_red_color);
        }

        &.info {
            @include colorMessage($om_blue_color1, $om_blue_color, $om_blue_color);
        }

        &.warning {
            @include colorMessage($om_yellow_color5, $om_alert_color, $om_alert_color);
        }

        &.sucess {
            @include colorMessage($om_green_color1, $om_green_color, $om_green_color);
        }
    }
</style>
