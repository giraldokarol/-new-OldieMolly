<script setup lang="ts">
//Import Components
import { ref } from 'vue';
//Models
import { Tab } from '../models/Tab.ts';
//Components
import HeaderHome from '../components/HeaderHome.vue';
import Tabs from '../components/Tabs.vue';


//Tabs config
const tabs = [new Tab("Login", "/"), new Tab("Sign Up", "signup")];
const infoHeader = [
    {
        id: "Login",
        title: "Welcome back !",
        description: "Join our community of parents giving baby items a second life! \n Buy and sell quality second-hand baby essentials while saving money and reducing waste. \n \n Log in to continue your journey toward smart, sustainable parenting.",
        image: "/site/illustration_login.svg"
    },
    {
        id: "Sign Up",
        title: "You are a new member !",
        description: "Join our community of smart parents! Buy & sell quality baby items sustainably. Sign up now!",
        image: "/site/illustration_signup.svg"
    }
];
const currentInfo = ref<any>(infoHeader[0]);
const handleSelectTab = (tab:any) =>{ 
    infoHeader.forEach((el)=>{
        if(el.id === tab.text){
            currentInfo.value=el;
        }
    })
}
</script>

<template>
    <div class="om_container_noheader">
        <div class="om_home_container">
            <div class="om_home_content">
               <HeaderHome  :info="currentInfo"/>
               <Tabs :list="tabs" @selectedItem="handleSelectTab"></Tabs>
               <router-view></router-view>
            </div>
            
            <div class="om_home_banner" :class="{'om_yllback_light' : currentInfo.id === 'Login', 'om_orangback_light' : currentInfo.id == 'Sign Up' }">
                <img src="/public/site/logo.svg" alt="Oldie Molly Logo" width="468" height="80" class="om_home_banner_logo">
                <img :src="currentInfo.image" alt="" class="om_home_banner_img">
            </div>
        </div>
    </div>  
</template>

<style scoped lang="scss">
.om_home {
    &_container{
        display: flex;
        align-items: center;
        @include rem(gap, 52);
        height: calc(100vh - #{pxToRem(40)}rem);
    }

    &_content {
        flex: 1;
        @include rem(padding, 0 40);
    }

    &_banner{
        height: 100%;
        width: 50%;
        @include rem(border-radius, 25);
        @include rem(padding, 40);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        @include rem(gap, 40);
    }

    &_banner_img {
        width: 85%;
    }


    @media screen and (max-width:920px){
        &_container{
            flex-direction: column;
            height: auto;
        }

        &_banner {
            order: -1;
            width: 100%;
            @include rem(border-radius, 10);
            @include rem(padding, 16 0);
        }
        &_banner_logo {
            width: 45%;
            height: auto;
        }
        &_banner_img {
            display: none;
        }
    }
}
</style>