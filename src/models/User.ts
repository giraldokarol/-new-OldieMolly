export class User {
    userName:string;
    userLastname:string;
    email:string;
    password: string;
    address:string;
    constructor( email:string, userName:string, password:string, userLastname:string, address:string){
        this.email = email;
        this.userName = userName;
        this.password = password;
        this.userLastname = userLastname;
        this.address = address;
    }
}