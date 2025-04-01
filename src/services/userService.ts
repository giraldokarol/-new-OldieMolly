import axios from 'axios';
const URL_USER_API = "http://oldiemolly.mooo.com/api/user/";

export const userService = {
    //Login
    async logIn(email:string, password:any){
        try{
            const response = await axios.post(`${URL_USER_API}/login.php`, {email, password});
            const {jwt} = response.data;

            if(jwt) {
                localStorage.setItem('user_token', jwt);
            }
            return response.data;
        }catch(error:any){
            throw error.message;
        }
    },

    //getUser Data -> jwt
    async getUserData(){
        const token = localStorage.getItem('user_token');
        if(!token) {throw new Error("You are not authenticated");}
        const response = await axios.post(`${URL_USER_API}/validate_token.php`, {"jwt" : token});
        localStorage.setItem('user_data', response.data.data);
        return response.data.data;
    },

    //Signup -> create User
    async createUser(user:any){
        try{
            const response = await axios.post(`${URL_USER_API}/create_user.php`, user);
            return response.data;
        }catch(error:any){
            throw error.message;
        }
    },
    
    //Validate email
    async validateEmail(email:string){
        const validate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return validate.test(email);
    },

    async validatePassword(password:string){
        if(password.length >= 6 ){
            return true;
        }else {
            return false;
        }
    }
};