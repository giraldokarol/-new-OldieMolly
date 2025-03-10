<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
//Components
import ReturnMessage from './ReturnMessage.vue';
//Models and Services
import { Messages } from '../models/Messages';
import { userService } from '../services/userService';

//Login
const router:any = useRouter()
const email:any = ref("");
const password:any = ref("");

//Manage Error Messages
const showError:any = ref(false);
const message:any = ref({});

function manageErrorMessage(msg:string){
    showError.value = true;
    message.value = new Messages("error", msg);
}

async function logIn(event: Event){
    event.preventDefault();
    try{
        const user = await userService.logIn(email.value, password.value);
        const userData = await userService.getUserData();

        if(user.status == 200 && userData) {
            router.push({name:'HomeUser', params: {userName: userData.userName}})
        }else{            
            manageErrorMessage("You are using the wrong email or the wrong password");
        }
    }catch(error:any){
        manageErrorMessage("You don't have an account with us");
    }
}
</script>

<template>
    <div class="om_login_form_content">
        <form method="post" autocomplete="off" name="login_form" id="login_form">
            <div class="om_form_section">
                <label for="email">
                    Email
                    <span class="required">*</span>
                </label>
                <input v-model="email" type="email" name="email" id="email" autocomplete="email">
            </div>

            <div class="om_form_section">
                <label for="password">
                    Password
                    <span class="required">*</span>
                </label>
                <input v-model="password" type="password" name="password" id="password" autocomplete="password">
            </div>

            <div class="om_form_buttons">
                <a href="" class="om_btn" aria-labelledby="label-validate" role="button" @click="logIn($event)">
                    <span class="om_btn_body" id="label-validate">
                        <span class="om_btn_label">Log in and start saving</span>
                    </span>
                </a>
            </div>
        </form>
        <ReturnMessage v-show="showError" :message="message"></ReturnMessage>
    </div>
</template>

<style scoped lang="scss">
.om_login_form_content {
    .om_form_buttons { 
        .om_btn {
            width: 100%;
        }
    }
}
</style>