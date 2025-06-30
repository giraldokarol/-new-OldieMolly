<script lang="ts" setup>
import { useAuthStore } from '../stores/authStore';
import { responsive } from '../mixins/responsive';
import { onMounted, ref } from 'vue';
//Components
import Tag from '../components/Tag.vue';
import Card from '../components/Card.vue';
//Services
import { categoryService } from '../services/categoryService';
import type { Category } from '../models/Category';
import { productService } from '../services/productService';
import type { Product } from '../models/Product';

const {isMobileLarge} = responsive();
const isAuth = useAuthStore();
//Scroll Filters
const scrollContainer = ref<HTMLDivElement | null>(null);; // Container a scroller
const atStart = ref<boolean>(true);
const atEnd= ref<boolean>(false);

function updateScroll(){
    const el = scrollContainer.value;
    if (!el) return;
    atStart.value = el.scrollLeft === 0;
    atEnd.value = Math.ceil(el.scrollLeft + el.clientWidth) > el.scrollWidth;
}
function moveLeft(){
    if(scrollContainer.value){
        scrollContainer.value.scrollBy({left: -200, behavior:'smooth'});
        setTimeout(updateScroll, 300);
    }
}
function moveRight(){
    if(scrollContainer.value){
        scrollContainer.value.scrollBy({left: 200, behavior:'smooth'});
        setTimeout(updateScroll, 300);
    }
}

//Category Handling
const categories = ref<Category[]>([]);

function asignIcon(type:string){
    if(type.includes('Mobility')){
        return 'om_icon_stroller';
    } else if(type.includes('Room')){
        return 'om_icon_crib';
    } else if(type.includes('Toys')){
        return 'om_icon_cartoy'
    } else if(type.includes('Clothes')){
        return 'om_icon_clothes';
    } else if(type.includes('Kitchen')){
        return 'om_icon_blender';
    }
}

//Product Handling
const products = ref<Product[]>([]);

onMounted(async() => {
    //Get Categories
    categories.value = await categoryService.getCategories();
    //Get Porducts
    products.value = await productService.getProducts();
});

</script>

<template>
    <div class="om_home_title_container">
        <div class="om_home_title">
            <h1>Hi {{ isAuth.user.userName }} !</h1>
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
    <div class="om_home_filters_wrapper">
        <div class="om_home_filters_container" aria-label="Product Categories" tabindex="0" role="region" ref="scrollContainer">
            <ul>
                <li><Tag icon="om_icon_all" text="All our products"></Tag></li>
                <li v-for="cat in categories">
                    <Tag :text="cat.nameCategory" :icon="asignIcon(cat.nameCategory)"></Tag>
                </li>
            </ul>
            
        </div>
        <div class="om_home_filters_controls" v-if="isMobileLarge">
            <button aria-label="Move left" :disabled="atStart" @click="moveLeft" class="om_home_filters_controls_btn" :class="{'disabled':atStart}">
                <span aria-hidden="true" class="om_icon_chevron_left"></span>
            </button>
            <button aria-label="Move right" :disabled="atEnd" @click="moveRight" class="om_home_filters_controls_btn" :class="{'disabled':atEnd}">
                <span aria-hidden="true" class="om_icon_chevron_right"></span>
            </button>
        </div>
    </div>

    <div class="om_home_card_wrapper">
        <div class="om_home_card_container" aria-label="Product Cards" role="region">
            <Card v-for="p in products" :product="p"></Card>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .om_home {
        //Title and Welcome text
        &_title_container {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            flex-wrap: wrap;
            @include rem(margin, 40 0 30 0) ;
        }

        &_title {
            @include rem(max-width, 639);
            h1 {
                font-weight: 900;
                @include rem(font-size, 24);
                @include rem(margin-top, 6);
            }

            &_sub {
                @include rem(font-size, 16);
            }
        }

        //Filters
        &_filters_container ul{
            display: flex;
            align-items: center;
            @include rem(gap, 8);
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scroll-snap-type: x mandatory;
            &::-webkit-scrollbar {display: none;}
        }

        &_filters_controls {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            @include rem(margin-top, 16);
            @include rem(gap, 8);
            &_btn {
                display: flex;
                align-items: center;
                background: transparent;
                border: 0;
                cursor: pointer;
                @include rem(width, 32);
                @include rem (height, 32);
                @include rem(border-radius, 8);

                &.disabled {
                    cursor: auto;
                    span[class*="om_icon"] {
                        @include svgColor($om_black_color2);
                    }
                    &:hover {
                        background: transparent;
                    }
                }

                span[class*="om_icon"]{
                    @include svgSize(18);
                    @include svgColor($om_orange_color2);
                }

                &:hover, &:focus-visible {
                    background: $om_orange_color5;
                }

                &:focus-visible {
                    outline: #{pxToRem(2)}rem dashed $om_orange_color1;
                }
            }
        }

        &_card_container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(#{pxToRem(407)}rem, 1fr));
            @include rem(gap, 14);
            @include rem(margin-top, 20);
        }

        @media screen and (max-width: $mobile_dimension) {
            &_search, &_title {
                width: 100%;
            }

            &_search {
                @include rem(margin-top, 10);
            }
        }
    }

</style>