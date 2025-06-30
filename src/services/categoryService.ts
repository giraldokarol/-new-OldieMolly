import axios from "axios";
const URL_CATEGORY_API = "http://oldiemolly.mooo.com/api/category/";

export const categoryService = {
    //Get all categories
    async getCategories(){
        try{
            const response = await axios.get(`${URL_CATEGORY_API}read.php`);
            const data = response.data;
            return data;
        }catch(error:any){
            throw error.message;
        }
    }
}