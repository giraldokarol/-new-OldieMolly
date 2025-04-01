export class NavigationLink {
    text: string;
    title: string;
    route: {name:string, param:string};
    constructor(text: string, title:string, route:{name:string, param:string}){
        this.text = text;
        this.title = title;
        this.route = {name: route.name, param:route.param};
    }
}