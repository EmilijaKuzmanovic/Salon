import { Termin } from "./Termin.js";
import {Raspored} from "./Raspored.js"

fetch("https://localhost:5001/FrizerskiSalon/PreuzmiRasporede").then(p=>{
    p.json().then(data=> {
        data.forEach(raspored=>{
            const raspored1=new Raspored(raspored.id, raspored.naziv, raspored.n, raspored.m, raspored.maxKapacitet);
            raspored1.crtajRaspored(document.body);
        });
    });
});
 ///const vrt2=new Raspored( 1,"Family", 6,7,2);
//vrt2.crtajRaspored(document.body);
