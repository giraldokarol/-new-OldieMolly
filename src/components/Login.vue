<script setup lang="ts">
</script>

<template>
    <div class="om_login_form_content">
        <form method="post" autocomplete="off" name="login_form" id="login_form">
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

            <div class="om_form_buttons">
                <a href="" class="om_btn" aria-labelledby="label-validate" role="button">
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