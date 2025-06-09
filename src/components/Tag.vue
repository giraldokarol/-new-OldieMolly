<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        icon?: string,
        text?: string,
        selected?: boolean
    }>(),
    {
        icon: '',
        text: "Tag Text",
        selected: false
    }
)
</script>

<template>
    <button class="om_tag" :aria-label="props.text" :class="{'selected' : selected}">
        <span class="om_tag_icon" :class="props.icon" aria-hidden="true"></span>
        <p class="om_tag_text" >{{ props.text }}</p>
    </button>
</template>

<style scoped lang="scss">
    .om_tag {
        display: inline-flex;
        align-items: center;
        background: #fff;
        border: #{pxToRem(1)}rem solid $om_black_color4;
        @include rem(gap, 12);
        @include rem(border-radius, 8);
        @include rem(padding, 12 16);
        color: $om_black_color1;
        cursor: pointer;
        transition: all 0.2s ease;

        &_text {
            white-space: nowrap;
            font-weight: 500;
            margin: 0;
        }
        &_icon {
            @include svgColor($om_black_color4);
            @include svgSize(20);
        }

        &:hover {
            background: $om_yellow_color5;
            border-color: $om_yellow_color5;
            color: $body_color;
            .om_tag_icon {
                @include svgColor($body_color);
            }
        }

        &.selected {
            background: $om_yellow_color5;
            border-color: $om_yellow_color2;
            color: $body_color;
            .om_tag_icon {
                @include svgColor($body_color);
            }
        }

        @media screen and (max-width: $mobile_dimension) {
            
        }
    }
</style>