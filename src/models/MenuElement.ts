import { NavigationLink } from "./NavigationLink";

export class MenuElement {
    aria : string;
    links: NavigationLink[];
    cta: string[];
    hasBurger: boolean;
    constructor(aria: string, links:{text:string, title:string, route:{name:string, param:string}}[], cta:string[], hasBurger:boolean){
        this.aria = aria;
        this.hasBurger = hasBurger;
        this.cta = cta;
        this.links = links.map((link) => new NavigationLink(link.text, link.title, link.route));
    }
}