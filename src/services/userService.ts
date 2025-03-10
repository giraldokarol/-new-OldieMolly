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
        return response.data.data;
    }

    //Signup -> create User
};