import {createRouter, createWebHistory} from 'vue-router';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import {getActivePinia } from 'pinia'
import { useAuthStore } from '../stores/authStore';
//Layouts
import AuthLayout from '../layouts/AuthLayout.vue';
import UserLayout from '../layouts/UserLayout.vue';
//Views
import Login from '../views/Login.vue';
import SignUp from '../views/SignUp.vue';
import HomeUser from '../views/HomeUser.vue';
import Order from '../views/Order.vue';


const router:any = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: AuthLayout,
            children: [
                {path: "", name: "Login", component: Login },
                {path: "signup", name: "SignUp", component: SignUp}
            ]
        }, 
        {
            path: "/:userName",
            component: UserLayout,
            meta: {requireAuth: true},
            children: [
                {path: "", name:"HomeUser", component: HomeUser},
                {path:"orders", name:"Orders", component: Order}
            ]
        },
    ],
});

router.beforeEach((to:RouteLocationNormalized, from:RouteLocationNormalized, next:NavigationGuardNext) => {
    if(!getActivePinia ){
        next();
        return;
    }

    const auth = useAuthStore();

    if(to.meta.requireAuth && !auth.isAuthenticated){
        next({name: "Login"});
        return;
    }else {
        next();
    }
});

export default router;