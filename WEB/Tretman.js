export class Tretman{
    constructor(redniBroj, cena, vremeTrajanja, par) {
        this.redniBroj = redniBroj;
        this.cena = cena;
        this.vremeTrajanja = vremeTrajanja;
        this.par = par;
        this.tretmanContainer = null;
    }

    napisiTretman(host) {
        this.tretmanContainer = document.createElement("div");
        this.tretmanContainer.innerHTML = this.redniBroj + ".";
        host.appendChild(this.tretmanContainer);
    }

    azurirajTretman(redniBr, cena, vreme) {
        this.redniBr=redniBr;
        this.cena=cena;
        this.vreme=vreme + 10;
    }
   
}