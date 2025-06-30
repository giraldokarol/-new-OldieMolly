import axios from "axios";
const URL_PRODUCT_API = "http://oldiemolly.mooo.com/api/product/";

export const productService = {
    //Get All products
    async getProducts() {
        try {
            const response = await axios.get(`${URL_PRODUCT_API}read.php`);
            const data = response.data;
            return data;
        }catch(error:any){
            throw error.message;
        }
    }
}