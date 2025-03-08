<script setup lang="ts">
//Import Components
import { ref, shallowRef } from 'vue';
import Header_Home from '../components/Header_Home.vue';
import Tabs from '../components/Tabs.vue';
import Login from '../components/Login.vue';
import SignUp from '../components/SignUp.vue';

//Tabs config
const tabs = [
    {
        name: "Login",
        component: Login,
        title: "Welcome back !",
        description: "Join our community of parents giving baby items a second life! \n Buy and sell quality second-hand baby essentials while saving money and reducing waste. \n \n Log in to continue your journey toward smart, sustainable parenting.",
        image: "/site/illustration_login.svg"
    },
    {
        name: "Sign Up",
        component: SignUp,
        title: "You are a new member !",
        description: "Join our community of smart parents! Buy & sell quality baby items sustainably. Sign up now!",
        image: "/site/illustration_signup.svg"
    }
]
const selectTab:any = shallowRef(Login);
const currentInfo:any = ref(tabs[0]);
const currentImage:any = ref(currentInfo.value.image);

const handleSelectTab = (tab:any) =>{ 
    selectTab.value = tab.component;
    currentInfo.value = tab; 
    currentImage.value = tab.image;
    console.log(currentImage)
}


</script>

<template>
    <div class="om_container_noheader">
        <div class="om_home_container">
            <div class="om_home_content">
                <Header_Home :info="currentInfo"/>
                <Tabs :list="tabs" @selectedItem="handleSelectTab"></Tabs>
                <component :is="selectTab"></component>
            </div>
            
            <div class="om_home_banner" :class="{'om_yllback_light' : selectTab == Login, 'om_orangback_light' : selectTab == SignUp }">
                <img src="/public/site/logo.svg" alt="Oldie Molly Logo" width="468" height="80">
                <img :src="currentImage" alt="" class="om_home_banner_img">
            </div>
        </div>
     </div>
    
</template>

<style scoped lang="scss">
.om_home {
    &_container{
        display: flex;
        align-items: center;
        @include rem(gap, 32);
        height: calc(100vh - #{pxToRem(40)}rem);
    }

    &_content {
        flex: 1;
        @include rem(padding, 0 20);
    }

    &_banner{
        height: 100%;
        width: 55%;
        @include rem(border-radius, 25);
        @include rem(padding, 40);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        @include rem(gap,   40);
    }

    &_banner_img {
        width: 85%;
    }
}
</style>