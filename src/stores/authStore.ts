import { defineStore } from 'pinia';
import { userService } from '../services/userService';
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const token:any = ref(localStorage.getItem('user_token') || null);
    const user= ref<any>(null);
    const router = useRouter();
    const isAuthenticated = computed(() => !!token.value)

    async function logIn(email:string, password:string){
        try{
            const data = await userService.logIn(email, password);
            if(data.jwt){
                token.value = data.jwt;
                localStorage.setItem('user_token', data.jwt)
                await fetchUserData();
                router.push({name:'HomeUser', params: {userName: user.value?.userName}})
            }
        }catch(error){
            console.error("We dont have acces")
        }
    }

    async function fetchUserData(){
        try{
            const userData = await userService.getUserData();
            user.value = userData;
            localStorage.setItem('user_data', user.value);
        }catch(error){
            console.error("Error to get user data")
        }
    }

    async function logOut(){
        token.value = "";
        user.value = null;
        localStorage.removeItem('user_token');
        localStorage.removeItem('user_data');
        router.push({name:'HomeView'});
        location.reload();
    }

    return {
        token, 
        user, 
        logIn, 
        fetchUserData, 
        logOut, 
        isAuthenticated
    };

});