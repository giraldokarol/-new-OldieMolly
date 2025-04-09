import { NavigationLink } from "./NavigationLink";

export class MenuElement {
    aria : string;
    links: NavigationLink[];
    cta: NavigationLink[];
    hasBurger: boolean;
    logo: {hasLogo:boolean, src: string, alt:string, width:number, height:number};
    styles: {type:string, justify:string}
    constructor(aria: string, links:{text:string, title:string, route:{name:string, param:string}}[], cta:{text:string, title:string, route:{name:string, param:string}}[], hasBurger:boolean, logo:{hasLogo:boolean, src:string, alt:string, width:number, height:number}, styles:{type:string, justify:string}){
        this.aria = aria;
        this.hasBurger = hasBurger;
        this.logo = logo;
        this.cta = cta.map((c) => new NavigationLink(c.text, c.title, c.route));;
        this.links = links.map((link) => new NavigationLink(link.text, link.title, link.route));
        this.styles = styles;
    }
}