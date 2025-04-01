<script setup lang="ts">
import { reactive, ref } from 'vue';
//User Information API
import { User } from '../models/User';
import { userService } from '../services/userService';
//Manage bloc messages Info / Error / Warning / Success
import { Messages } from '../models/Messages';
import ReturnMessage from '../components/ReturnMessage.vue';
//Validation Input forms
import { hasEmptyValues, identifyEmptyValue } from '../services/validationFormService';
import { ErrorMessageForm } from '../models/ErrorMessageForm';

//Contns et  refs
const user:any = ref({userName:"", userLastname: "", email: "", password: "", address: ""});
const showMessage:any = ref(false);
const message:any = ref({});
const errors = reactive<Record<string, { text: string }>>({});


//Maniputale Messages // Creation de bloc de messages --> Error / Info / Warning / Success
function manageMessages(type:string, text:string){
    showMessage.value = true;
    message.value = new Messages(type, text);
}

//Validations
async function validationInfoUser(mail: string, pass: string){
    //Mail
    const validationEmail =  await userService.validateEmail(mail);
    //errors.errorEmail.isShow = !validationEmail ? true : false;
    if(!validationEmail) {
        const error = new ErrorMessageForm("email", "Email not valid : exemple@domain.com");
        errors[error.name] = {text: error.text};
    }else {
        delete errors["email"]
    }
    //Password
    const validationPassword = await userService.validatePassword(pass);
    if(!validationPassword) {
        const error = new ErrorMessageForm("password", "Password must have at least 6 characters");
        errors[error.name] = {text: error.text};
    }else {
        delete errors["password"]
    }

    if(validationEmail && validationPassword) { return true;} 
    else{ return false }  
}

async function throwErrorsForm(obj:any) {
    const emptyValues = identifyEmptyValue(obj);
    emptyValues.forEach(value => {
        const error = new ErrorMessageForm(value, "Information required");
        errors[error.name] = {text: error.text};
    });
}

//Reset Inputs
function resetInput(){
    user.value.userName = "";
    user.value.userLastname = "";
    user.value.email = "";
    user.value.password = "";
    user.value.address = "";
    
    Object.keys(errors).forEach(key =>{
        delete errors[key];
    })
}

//SignUp function
async function signUp(event: Event){
    event.preventDefault();
    try{
        if(!hasEmptyValues(user.value)){
            const newUser = new User(user.value.email, user.value.userName,  user.value.password, user.value.userLastname,user.value.address);
            const validInfo = await validationInfoUser(newUser.email, newUser.password);
            if (validInfo){
                await userService.createUser(newUser);
                manageMessages("sucess", `<strong>Congratulations!</strong> You account ${user.value.email} has been created.</br> <a href="/">Go to Login Page</a>`);
                resetInput();
            }
        }else{
            throwErrorsForm(user.value);
            manageMessages("error", "All the information are required");
        }
    }catch(error: any){
        manageMessages("error", "Oops! We has a problem with the process. Can you do it again ?");
    }
}
</script>

<template>
    <div class="om_signup_form_content">
        <ReturnMessage v-show="showMessage" :message="message"></ReturnMessage>
        <form method="post" autocomplete="off" name="signup_form" id="signup_form">
            <div class="om_form_group">
                <div class="om_form_section">
                    <label for="userName">
                        Name 
                        <span class="required">*</span>
                    </label>
                    <input v-model="user.userName" type="text" name="userName" id="userName" autocomplete="userName" aria-describedby="userName-error">
                    <span v-if="errors.userName" id="userName-error" class="om_form_error">{{ errors.userName.text }}</span>
                </div>

                <div class="om_form_section">
                    <label for="userLastname">
                        Lastname 
                        <span class="required">*</span>
                    </label>
                    <input v-model="user.userLastname" type="text" name="userLastname" id="userLastname" autocomplete="userLastname" aria-describedby="userLastname-error">
                    <span v-if="errors.userLastname" id="userLastname-error" class="om_form_error">{{ errors.userLastname.text }}</span>
                </div>
            </div>

            <div class="om_form_section">
                <label for="email">
                    Email 
                    <span class="required">*</span>
                </label>
                <input v-model="user.email" type="email" name="email" id="email" autocomplete="email" aria-describedby="email-error">
                <span v-if="errors.email" id="email-error" class="om_form_error">{{ errors.email.text }}</span>
            </div>

            <div class="om_form_section">
                <label for="password">
                    Password 
                    <span class="required">*</span>
                </label>
                <input v-model="user.password" type="password" name="password" id="password" autocomplete="password" aria-describedby="password-error">
                <span v-if="errors.password" id="password-error" class="om_form_error">{{ errors.password.text }}</span>
            </div>

            <div class="om_form_section">
                <label for="address">
                    Address 
                    <span class="required">*</span>
                </label>
                <input v-model="user.address" type="text" name="address" id="address" autocomplete="address" aria-describedby="address-error">
                <span v-if="errors.address" id="address-error" class="om_form_error">{{ errors.address.text }}</span>
            </div>
            
            <div class="om_form_buttons">
                <a href="" class="om_btn" aria-labelledby="label-validate" role="button" @click="signUp($event)">
                    <span class="om_btn_body" id="label-validate">
                        <span class="om_btn_label">Welcome to Oldie Molly</span>
                    </span>
                </a>
            </div>
        </form>
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