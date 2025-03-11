<script setup lang="ts">
import { ref } from 'vue';
import { User } from '../models/User';
import { Messages } from '../models/Messages';
import { userService } from '../services/userService';
import ReturnMessage from './ReturnMessage.vue';

//Contns et  refs
const user:any = ref({userName:"", userLastname: "", email: "", password: "", address: ""});
const showMessage:any = ref(false);
const message:any = ref({});
const errorEmail = ref<boolean>(false);
const errorPassword = ref<boolean>(false);


//Validation if user objet is empty
function hasEmptyValues(obj:any): boolean{
    return Object.values(obj).some(value => value === "" || value === null || value === undefined);
}

//Maniputale Messages
function manageMessages(type:string, text:string){
    showMessage.value = true;
    message.value = new Messages(type, text);
}

//Reset Inputs
function resetInput(){
    user.value.userName = "";
    user.value.userLastname = "";
    user.value.email = "";
    user.value.password = "";
    user.value.address = "";
}

async function validateEmail(mail: string){
    const validationEmail =  await userService.validateEmail(mail);
    errorEmail.value = !validationEmail ? true : false;
    return validationEmail;
}

async function  validatePassword (pass:string) {
    const validationPassword = await userService.validatePassword(pass);
    if(!validationPassword) {errorPassword.value =true;}
    return validationPassword;
}
//SignUp function
async function signUp(event: Event){
    event.preventDefault();
    try{
        if(!hasEmptyValues(user)){
            const newUser = new User(user.value.email, user.value.userName,  user.value.password, user.value.userLastname,user.value.address);
            const validEmail = await validateEmail(newUser.email);
            const validPassword = await validatePassword(newUser.password);
            if (validEmail && validPassword){
                await userService.createUser(newUser);
                manageMessages("sucess", `<strong>Congratulations!</strong> You account ${user.value.email} has been created.</br> <a href="/">Go to Login Page</a>`);
                resetInput();
            }
        }else{
            manageMessages("error", "All the information are required");
        }
    }catch(error: any){
        manageMessages("error", "Oops! We has a problem with the process. Can you do it again ?");
    }
}
</script>

<template>
    <div class="om_signup_form_content">
        <form method="post" autocomplete="off" name="signup_form" id="signup_form">
            <div class="om_form_group">
                <div class="om_form_section">
                    <label for="userName">
                        Name 
                        <span class="required">*</span>
                    </label>
                    <input v-model="user.userName" type="text" name="userName" id="userName" autocomplete="userName">
                </div>

                <div class="om_form_section">
                    <label for="userLastname">
                        Lastname 
                        <span class="required">*</span>
                    </label>
                    <input v-model="user.userLastname" type="text" name="userLastname" id="userLastname" autocomplete="userLastname">
                </div>
            </div>

            <div class="om_form_section">
                <label for="email">
                    Email 
                    <span class="required">*</span>
                </label>
                <input v-model="user.email" type="email" name="email" id="email" autocomplete="email" aria-describedby="email-error">
                <span v-show="errorEmail" id="email-error" class="om_form_error">Email not valid : exemple@domain.com</span>
            </div>

            <div class="om_form_section">
                <label for="password">
                    Password 
                    <span class="required">*</span>
                </label>
                <input v-model="user.password" type="password" name="password" id="password" autocomplete="password" aria-describedby="password-error">
                <span v-show="errorPassword" id="password-error" class="om_form_error">Password must have at least 6 characters</span>
            </div>

            <div class="om_form_section">
                <label for="address">
                    Address 
                    <span class="required">*</span>
                </label>
                <input v-model="user.address" type="text" name="address" id="address" autocomplete="address">
            </div>
            
            <div class="om_form_buttons">
                <a href="" class="om_btn" aria-labelledby="label-validate" role="button" @click="signUp($event)">
                    <span class="om_btn_body" id="label-validate">
                        <span class="om_btn_label">Welcome to Oldie Molly</span>
                    </span>
                </a>
            </div>
        </form>
        <ReturnMessage v-show="showMessage" :message="message"></ReturnMessage>
    </div>
</template>

<style scoped lang="scss">
.om_signup_form_content {
    .om_form_buttons {
        .om_btn {
            width: 100%;
        }
    }
}
</style>