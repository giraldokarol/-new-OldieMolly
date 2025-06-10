export class Product {
    prodName:string;
    price:number;
    quantity:number;
    type:string;
    description:string;
    image1:string;
    image2:string;
    image3:string;
    idUser:number;
    idCategory:number;
    constructor(prodName:string, price:number, quantity:number, type:string, description:string, image1:string, image2:string, image3:string, idUser:number, idCategory:number){
        this.prodName = prodName;
        this.price = price;
        this.quantity = quantity;
        this.type = type;
        this.description = description;
        this.image1 = image1;
        this.image2 = image2;
        this.image3 = image3;
        this.idUser = idUser;
        this.idCategory = idCategory;
    }
}