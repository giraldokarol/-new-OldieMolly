<script setup lang="ts">
import { ref, reactive} from 'vue';
import { useRouter } from 'vue-router';
//Components
import ReturnMessage from './ReturnMessage.vue';
//Models and Services
import { Messages } from '../models/Messages';
import { userService } from '../services/userService';
//Management Errors
import {hasEmptyValues, identifyEmptyValue} from '../services/validationFormService';
import { ErrorMessageForm } from '../models/ErrorMessageForm';

//Login
const router:any = useRouter()
const user:any = ref({email:"", password:""})
const errors = reactive<Record<string, { text: string }>>({});

//Manage Error Messages
const showError:any = ref(false);
const message:any = ref({});

function manageErrorMessage(msg:string){
    showError.value = true;
    message.value = new Messages("error", msg);
}

async function throwErrorsForm(obj:any) {
    const emptyValues = identifyEmptyValue(obj);
    emptyValues.forEach(value => {
        const error = new ErrorMessageForm(value, "Information required");
        errors[error.name] = {text: error.text};
    });
}

async function logIn(event: Event){
    event.preventDefault();
    try{
        if(!hasEmptyValues(user.value)){
            const data = await userService.logIn(user.value.email, user.value.password);
            const userData = await userService.getUserData();
            if(data.status == 200 && userData) {
                router.push({name:'HomeUser', params: {userName: userData.userName}})
            }else{            
                manageErrorMessage("You are using the wrong email or the wrong password");
            }
        }else{
            throwErrorsForm(user.value);
            manageErrorMessage("All the information are required");
        }
        
    }catch(error:any){
        manageErrorMessage("You don't have an account with us");
    }
}
</script>

<template>
    <div class="om_login_form_content">
        <ReturnMessage v-show="showError" :message="message"></ReturnMessage>
        <form method="post" autocomplete="off" name="login_form" id="login_form">
            <div class="om_form_section">
                <label for="email">
                    Email
                    <span class="required">*</span>
                </label>
                <input v-model="user.email" type="email" name="email" id="email" autocomplete="email" aria-describedby="email-error-log">
                <span v-if="errors.email" id="email-error-log" class="om_form_error">{{ errors.email.text }}</span>
            </div>

            <div class="om_form_section">
                <label for="password">
                    Password
                    <span class="required">*</span>
                </label>
                <input v-model="user.password" type="password" name="password" id="password" autocomplete="password" aria-describedby="password-error-log">
                <span v-if="errors.password" id="password-error-log" class="om_form_error">{{ errors.password.text }}</span>
            </div>

            <div class="om_form_buttons">
                <a href="" class="om_btn" aria-labelledby="label-validate" role="button" @click="logIn($event)">
                    <span class="om_btn_body" id="label-validate">
                        <span class="om_btn_label">Log in and start saving</span>
                    </span>
                </a>
            </div>
        </form>
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