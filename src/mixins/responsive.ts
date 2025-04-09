import { computed, onBeforeUnmount, onMounted, ref } from "vue";

export const responsive = () => {
    const windowWidth = ref(window.innerWidth);
    const isMobile = computed(() => windowWidth.value < 920);
    const handleResize = () =>{ windowWidth.value = window.innerWidth; }

    //Events
    onMounted(() =>{
        window.addEventListener('resize', handleResize);
    });
    onBeforeUnmount(() => {
        window.removeEventListener('resize', handleResize);
    });

    return isMobile;
};