export class Termin
{
    constructor (id, usluga, ime, kapacitet, m, n, rezervisan){
        this.id=id;
        this.x = m;
        this.y = n;
        this.kapacitet = kapacitet;
        this.usluga = usluga;
        this.ime=ime;
        this.rez=rezervisan;
        this.rezervisan = 0; 
        this.kapacitetNa=0;      
        this.terminContainer = null;
    }
 
    vratiBoju()
    {
        if(!this.usluga)
            return "#f0d8d4 ";
        else
            return this.usluga;
    }

    crtajTermin(host){
        this.terminContainer=document.createElement("div");
        this.terminContainer.className="ter";
        this.terminContainer.innerHTML="Slobodan termin,"+ "\r\n" + "Pozicija: ("+ this.x +","+ this.y+")";
        this.terminContainer.style.backgroundColor=this.vratiBoju();
        host.appendChild( this.terminContainer);
    }

    azurirajTermin(ime,dolazak,usluga,kap,pom) {
        if(this.kapacitetNa + dolazak  > kap)
        {
            alert("kapacitetNa ja popunjen!\r\nIzaberite neki od drugih termina u rasporedu.");
        }
        else
        {
            this.ime=ime;
            this.usluga=usluga;
            this.kapacitetNa+=dolazak;
            this.terminContainer.innerHTML= this.ime + "," + this.kapacitetNa;
            this.terminContainer.style.backgroundColor=this.vratiBoju();
        }
    }
  

    azurirajTerminProba(dolazak, kap)
    {
        
        if(this.kapacitetNa + dolazak  > kap)
        {
            alert("Kapacitet ja popunjen!\r\nIzaberite neki od drugih termina u rasporedu.");
            return 1;
        } 
        else
            return 0;
    }

    vratiBraon()
    {
        if(this.usluga)
            return "#f0d8d4";
    }

    obrisiRezervaciju(rezervacija,x,y) {
        this.rezervisan = rezervacija;
        if (rezervacija === 1) {
            alert("Termin nije rezervisan!");
        }
        else{
            this.terminContainer.innerHTML="Slobodan termin,"+ "\n\n\n" + "Pozicija: ("+ this.x +","+ this.y+")";
            this.terminContainer.style.backgroundColor=this.vratiBraon();
            this.kapacitetNa=0;
        }
        
    }

    obrisiSveRezervacije(rezervacija,x,y) {
            this.terminContainer.innerHTML="Slobodan termin,"+ "\n\n\n" + "Pozicija: ("+ this.x +","+ this.y+")";
            this.terminContainer.style.backgroundColor=this.vratiBraon();
            this.kapacitetNa=0;
    }

    azurirajRezervaciju(rezervacija, x, y) {
        this.rezervisan = rezervacija;
        if (rezervacija === 0)
            this.terminContainer.className = "rez";
    }
}

