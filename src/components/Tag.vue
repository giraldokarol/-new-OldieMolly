<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        icon?: string,
        text?: string
    }>(),
    {
        icon: '',
        text: "Tag Text"
    }
)
</script>

<template>
    <button class="om_tag">
        <span class="om_tag_icon" :class="props.icon" aria-hidden="true"></span>
        <p class="om_tag_text" :aria-label="props.text">{{ props.text }}</p>
    </button>
</template>