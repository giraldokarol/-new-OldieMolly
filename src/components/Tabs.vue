<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps(["list"]);

const currentTab:any = ref(props.list.length ? props.list[0].text : "");

//Emit to Parent Component
const emit = defineEmits(["selectedItem"]);
function selectedItem(value:any, event:Event){
    event.preventDefault();
    currentTab.value = value.text;
    emit("selectedItem", value);
}
</script>

<template>
    <ul class="om_tablist">
        <li v-for="li in list" class="om_tablist_item" :class="{selected: currentTab === li.text}">
            <router-link :to="li.link" 
            class="om_tablist_link" role="button" 
            :aria-label="li.text"  
            :aria-current="currentTab == li.text ? true : false"
            @click="selectedItem(li, $event)">
                {{li.text   }}
            </router-link>
        </li>
    </ul>
</template>

<style scoped lang="scss">
.om_tablist {
    list-style: none;
    display: flex;
    align-items: center;
    padding: 0;
    border-bottom: #{pxToRem(1)}rem solid $om_black_color2;
    @include rem(margin, 24 0 30);

    &_item {
        position: relative;
        transition: 0.2s background ease-in;
        @include rem(padding, 12 24);

        &.selected{
            &:after {
                @include selectedLine(-2, 60%, 3, $om_orange_color);
            }

            .om_tablist_link{
                color: $om_black_color;
                @include rem(-webkit-text-stroke, 1);
            }
            &:hover {
                background: transparent;
            }
        }

        &:hover .om_tablist_link{
            color: $om_black_color;
        }
    }

    &_link {
        text-decoration: none;
        color: $om_black_color1;
    }
}

</style>