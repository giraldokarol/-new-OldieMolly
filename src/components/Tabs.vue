<script setup lang="ts">
defineProps(["list"]);

const emit = defineEmits(["selectedItem"]);
function selectedItem(value:any, event:Event){
    event.preventDefault();
    emit("selectedItem", value);
}
</script>

<template>
    <ul>
        <li v-for="li in list"><a href="" @click="selectedItem(li, $event)">{{li.name}}</a></li>
    </ul>
</template>

<style scoped lang="scss"></style>