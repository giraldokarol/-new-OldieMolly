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
        description: "Join our community of parents giving baby items a second life! Buy and sell quality second-hand baby essentials while saving money and reducing waste." 
    },
    {
        name: "Sign Up",
        component: SignUp,
        title: "You are a new member !",
        description: "Join our community of smart parents! Buy & sell quality baby items sustainably. Sign up now!"
    }
]
const selectTab:any = shallowRef(Login);
const currentInfo:any = ref(tabs[0]);
const handleSelectTab = (tab:any) =>{ 
    selectTab.value = tab.component;
    currentInfo.value = tab; 
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
            
            <div class="om_home_banner"></div>
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
    }

    &_banner{
        height: 100%;
        width: 55%;
        background: $om_yellow_color5;
        @include rem(border-radius, 25);
    }
}
</style>