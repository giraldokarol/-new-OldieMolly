export class User {
    id:number;
    userName:string;
    userLastname:string;
    email:string;
    password: string;
    address:string;
    constructor(id:number, userName:string, userLastname:string, email:string, password:string, address:string){
        this.id = id;
        this.userName = userName;
        this.userLastname = userLastname;
        this.email = email;
        this.password = password;
        this.address = address;
    }
}