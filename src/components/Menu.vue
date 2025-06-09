<script lang="ts" setup>
import { RouterLink } from 'vue-router';
import { responsive } from '../mixins/responsive';
import { ref } from 'vue';

const props = defineProps(["items"]);
const {isMobile} = responsive();
const isOpen = ref(false);

/*
Types : horizontal (class: om_menu_hz) & vertical(class: om_menu_vrt)
Justify : center(class:om_menu_nav_center) / right(class:om_menu_nav_right)
*/
function menuType(rule:string){ return rule === 'horizontal'? 'om_menu_hz' : 'om_menu_vrt'}

function menuJustify(rule:string){
    if(rule === 'center'){
        return 'om_menu_nav_center';
    }else{
        return 'om_menu_nav_right';
    }
}


/*Burger*/
function openMenu(){
    const element:any = document.querySelector('body');
    if(element instanceof HTMLBodyElement){
        if(element.classList.contains('menumobile')){
            element.classList.remove('menumobile');
            isOpen.value = false;
        }else{
            element.classList.add('menumobile');
            isOpen.value = true;
        }
    }else {
        console.error("The element doesn't exist");
    }
}
</script>

<template>
    <div class="om_menu_logo" v-if="props.items.logo.hasLogo">
        <a href="/" class="om_logo_img" :title="`Go home to ${props.items.logo.alt}`">
            <img :src="props.items.logo.src" :alt="props.items.logo.alt" :width="props.items.logo.width" :height="props.items.logo.height">
        </a>
    </div>

    <nav  role="navigation" :aria-label="props.items.aria" class="om_menu_nav" :class="menuType(props.items.styles.type), menuJustify(props.items.styles.justify)">
        <button v-if="props.items.hasBurger && isMobile" type="button" :aria-expanded=isOpen  class="om_burgerbutton" :class="{'open': isOpen}" @click="openMenu()">
            <span class="om_burgerbutton_icon" aria-hidden="true">
                <span class="om_burgerbutton_lines"></span>
            </span>
            <span class="om_burgerbutton_text sr_only">Menu</span>
        </button>

        <ul :class="props.items.styles.type === 'horizontal' ? 'om_menu_hz': 'om_menu_vrt'">
            <li v-for="item in props.items.links" class="om_menu_item">
                <router-link :to="{name:item.route.name}">{{ item.text }}</router-link>
            </li>
        </ul>

        <div class="om_menu_actions" v-if="props.items.cta.length > 0">
            <router-link role="button" class="om_btn" v-for="cta in props.items.cta" :to="{name:cta.route.name}">{{cta.text}}</router-link>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
.om_menu {
    //Logo
    &_logo{
        height: 100%;
        display: flex;
        align-items: center;
    }
    //Navigation
    &_nav {
        display: flex;
        flex: 1;
        height: 100%;

        ul{
            display: flex;
            height: 100%;

            .om_menu_item {
                @include rem(margin-right, 24);

                a {
                    text-decoration: none;
                    
                    &.router-link-exact-active {
                        font-weight: 600;
                        position: relative;
                        &:after {
                            content: "";
                            position: absolute;
                            bottom: 0;
                            width: 100%;
                            @include rem(height, 3);
                            background: $om_orange_color;
                        }
                    }
                }

                &:last-child {
                    margin-right: 0;
                }
            }

            .om_menu_item, .om_menu_item a {
                height: 100%;
                display: flex;
                align-items: center;
            }
        }
    }

    //CTA
    &_actions {
        @include rem(margin,0 12);
    }

    //Type: Horizontal / Vertical
    &_hz{
        align-items: center;
    }

    &_vrt {
        flex-direction: column;
    }

    //Justify : Center / Right  -> Left is default
    &_nav_right{
        justify-content: flex-end;
    }

    &_nav_center{
        justify-content: center;
    }


    @media (max-width: $tablet_dimension) {
        position: relative;

        &_logo {
            @include rem(margin-left, calc($burger_size + 16));
            img {
                @include rem(width, 200);
                @include rem(margin-top, 8);
            }
        }

        &_nav {
            position: fixed;
            @include rem(top, 85);
            left: -100%;
            background: #FFF;
            height: calc(100vh - 85px);
            width: 100%;
            justify-content: flex-start;
            align-items: flex-start;
            transition: left 0.3s ease-in;

            .menumobile & {
                left: 0;
            }

            > ul {
                flex-direction: column;
                height: auto;
                width: 100%;
                @include rem(margin-top, 24);
                > .om_menu_item {
                    width: 100%;
                    margin: 0;
                    border-bottom: #{pxToRem(1)}rem solid $om_black_color3;
                    @include rem(min-height, 62);

                    a {
                        width: 100%;
                        @include rem(padding, 0 24);
                        @include svgIcon;
                        @include svgImage(chevron_right);
                        @include svgColor($body_color);
                        &:before {
                            position: absolute;
                            @include rem(right, 24);
                        }

                        &.router-link-exact-active::after {
                            @include rem(bottom, -24);
                            @include rem(left, 0);
                            width: 100%;
                        }
                    }

                    &:hover {
                        border-color: $om_orange_color;
                        a {
                            font-weight: 600;
                        }
                    }
                }
            }
        }

        .om_burgerbutton {
            position: fixed;
            border: 0;
            background: none;
            padding: 0;
            cursor: pointer;
            @include rem(top, $burger_top);
            @include rem(left, 24);
            @include rem(width, $burger_size);
            @include rem(height, $burger_size);

            &_icon {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: all .5s ease-in-out;
            }

            &_lines, &_lines:before, &_lines:after{
                @include rem(width, $burger_size);
                @include rem(height, 3);
                @include rem(border-radius, 5);
                background: $burger_color;
                transition: all .3s ease-in-out;
            }

            &_lines{
                &::before, &::after {
                    content: '';
                    position: absolute;
                    left: 0;
                }
                &:before {transform: translateY(-7px);}
                &:after {transform: translateY(7px);}
            }

            &_text {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                @include rem(bottom, -$burger_textsize);
                @include rem(font-size, $burger_textsize);
            }

            &.open {
                .om_burgerbutton_lines {
                    transform: translateX(-50px);
                    background: #FFF;
                    &::before{
                        transform: rotate(45deg) translate(35px, -35px);
                    }
                    &::after {
                        transform: rotate(-45deg) translate(35px, 35px);
                    }
                }
            }
            
        }
    }
}
</style>