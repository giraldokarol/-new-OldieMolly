<script setup lang="ts"></script>

<template>
    <div class="om_signup_form_content">
        <form method="post" autocomplete="off" name="signup_form" id="signup_form">
            <div class="om_form_group">
                <div class="om_form_section">
                    <label for="userName">
                        Name 
                        <span class="required">*</span>
                    </label>
                    <input type="text" name="userName" id="userName" autocomplete="userName">
                </div>

                <div class="om_form_section">
                    <label for="userLastname">
                        Lastname 
                        <span class="required">*</span>
                    </label>
                    <input type="text" name="userLastname" id="userLastname" autocomplete="userLastname">
                </div>
            </div>

            <div class="om_form_section">
                <label for="email">
                    Email 
                    <span class="required">*</span>
                </label>
                <input type="email" name="email" id="email" autocomplete="email">
            </div>

            <div class="om_form_section">
                <label for="password">
                    Password 
                    <span class="required">*</span>
                </label>
                <input type="password" name="password" id="password" autocomplete="password">
            </div>

            <div class="om_form_section">
                <label for="address">
                    Address 
                    <span class="required">*</span>
                </label>
                <input type="text" name="address" id="address" autocomplete="address">
            </div>
            
            <div class="om_form_buttons">
                <a href="" class="om_btn" aria-labelledby="label-validate" role="button">
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