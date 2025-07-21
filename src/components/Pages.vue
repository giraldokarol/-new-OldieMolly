<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    totalitems: number;
    itemPerPage: number;
    currentPage: number;
    maxVisibles?: number;
}>();
const max = props.maxVisibles ?? 4;
const totalPages = computed(() => Math.ceil(props.totalitems / props.itemPerPage));
const startPage = computed(() => {return Math.floor((props.currentPage - 1) / max) * max + 1;});
const endPage = computed(() => {return Math.min(startPage.value + max - 1, totalPages.value)});
const visiblePages = computed(() => {
    const pages:Array<number> = [];
    for(let i = startPage.value; i <= endPage.value; i++){
        pages.push(i);
    }
    return pages;
});

//Emit : Notify father when page change 
const emit = defineEmits<{
    (changePage: "page_changed", page:number):void
}>();

//Function
function changePage(page:number){
    if(page < 1 || page > totalPages.value) return; // Avoid go out to the range.
    emit("page_changed", page);
}

</script>

<template>
    <div class="om_pagination">
        <div class="om_pagination_controls">
            <button class="om_pagination_arrow_prev" aria-label="Previous Page" @click="changePage(props.currentPage - 1)" :disabled="props.currentPage === 1">
                <span aria-hidden="true" class="om_icon_chevron_left"></span>
            </button>
            <ul class="om_pagination_pages_list">
                <li class="om_pagination_page" v-for="page in visiblePages" :key="page" :class="{selected : props.currentPage === page}">
                    <button @click="changePage(page)">{{ page }}</button>
                </li>
            </ul>
            <button class="om_pagination_arrow_next" aria-label="Next Page" @click="changePage(props.currentPage + 1)" :disabled="props.currentPage === totalPages">
                <span aria-hidden="true" class="om_icon_chevron_right"></span>
            </button>
        </div>
        <p class="om_pagination_info">Page {{ props.currentPage  }} of {{ totalPages }}</p>
    </div>
</template>

<style scoped lang="scss">
.om_pagination {
    display: flex;
    flex-direction: column;
    align-items: center;

    button {
        background: none;
        border: 0;
        cursor: pointer;
        background: #FFFFFF;
        transition: background 0.2s ease;
        @include rem(width, 38);
        @include rem(height, 38);
        @include rem(border-radius, 8);

        &:disabled {
            cursor: default;
        }
    }

    &_info {
        @include rem(font-size, 14);
        color: $om_black_color1;
    }

    &_arrow_next, &_arrow_prev{
        span[class*="om_icon_"]{@include svgColor($om_black_color1);}
        &:hover {
            background: $om_black_color5;
        }
        &:disabled {
            &:hover {background: #FFFFFF;}
            span[class*="om_icon_"]{@include svgColor($om_black_color4);}
        }
    }

    &_controls {
        @include rem(gap, 12);
    }

    &_pages_list {
        @include rem(gap, 8);
    }

    &_page {
       button {
        color: $om_black_color1;
        border: #{pxToRem(1)}rem solid #FFFFFF;

        &:hover {
            background: $om_black_color5;
            color: $body_color;
        }
       }
       
       &.selected button{
        border-color: $om_orange_color;
        color: $om_orange_color;
       }
    }

    &_controls, &_pages_list{
        display: flex;
        align-items: center;
    }
}
</style>