import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import UserView from '../views/UserView.vue';

const router:any = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "HomeView",
            component: HomeView
        }, 
        {
            path: "/home/:userName",
            name: "HomeUser",
            component: UserView
        }
    ],
});

export default router;