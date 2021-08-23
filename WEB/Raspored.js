import {Termin} from "./Termin.js"
import {Tretman} from "./Tretman.js"

export class Raspored{
    constructor(id, naziv, n, m, maxKapacitet) {
        this.id = id;           
        this.naziv = naziv;
        this.n = n;
        this.m = m;
        this.maxKapacitet = maxKapacitet;  
        this.kontejner=null;
        this.termini=[];
        this.tretmani=[];
    }

    dodajTermin(ter)
    {
        this.termini.push(ter);
    }

    crtajRaspored(host) {
        if (!host)
            throw new Exception("Parent element does not exist!");
        
        this.kontejner = document.createElement("div");
        this.kontejner.className = "kontejner";
        host.appendChild(this.kontejner);
        this.crtajFormu(this.kontejner);
    }

    crtajFormu(host) {
        const pocetnaForma=document.createElement("div");
        pocetnaForma.className="pocetnaForma";
        host.appendChild(pocetnaForma);

        let linebreak = document.createElement("br");

        let elLabela = document.createElement("h2");
        elLabela.innerHTML = "Informacije o salonu \"" + this.naziv + "\"";
        pocetnaForma.appendChild(elLabela);

        const zaglavljeForma = document.createElement("div");
        zaglavljeForma.className = "zaglavlje";
        pocetnaForma.appendChild(zaglavljeForma);

        elLabela = document.createElement("label");
        elLabela.innerHTML = "Izaberite pol kome je namenjen termin: ";
        zaglavljeForma.appendChild(elLabela);

        let rezim = ["Žena", "Muškarac"];
        let divEl = null;
        let opcija = null;
        let labela = null;
        rezim.forEach((el, index) => {
            divEl = document.createElement("div");
            opcija = document.createElement("input");
            opcija.type = "radio";
            opcija.name = this.naziv;
            opcija.value = index;

            labela = document.createElement("label");
            labela.innerHTML = el;

            divEl.appendChild(opcija);
            divEl.appendChild(labela);
            zaglavljeForma.appendChild(divEl);
        })
        
        zaglavljeForma.appendChild(linebreak);

        let dugmeUredi = document.createElement("button");
        dugmeUredi.className = "dugme1";
        dugmeUredi.innerHTML = "Rezerviši tretman";
        zaglavljeForma.appendChild(dugmeUredi);

        const novaForma=document.createElement("div");
        novaForma.className="novaForma";
        host.appendChild(novaForma);

        dugmeUredi.onclick = (ev) => {

            const raspored = this.kontejner.querySelector(`input[name='${this.naziv}']:checked`);
            if (this.rezim != 0) {
                if (raspored == null)
                    alert("Molimo Vas izaberite pol kome je namenjen termin!");
                else {

                    const kontForma=document.createElement("div");
                    kontForma.className="kontForma";
                    novaForma.appendChild(kontForma);


                    let linebreak = document.createElement("br");

                    var elLabela=document.createElement("h2");
                    elLabela.innerHTML="Unos termina";
                    kontForma.appendChild(elLabela);

                    elLabela=document.createElement("label");
                    elLabela.innerHTML="Ime: ";
                    kontForma.appendChild(elLabela);

                    let tt=document.createElement("input");
                    tt.className="ime";
                    kontForma.appendChild(tt);

                    elLabela=document.createElement("label");
                    elLabela.innerHTML="Broj zakazanih tretmana:";
                    kontForma.appendChild(elLabela);

                    tt=document.createElement("input");
                    tt.className="kolicina";
                    tt.type="number"; 
                    kontForma.appendChild(tt);

                    elLabela=document.createElement("label");
                    elLabela.innerHTML="Selektuj uslugu:";
                    kontForma.appendChild(elLabela);
                    if (raspored.value == 0) {
                        var tipoviUsluge= ['šišanje', 'pedikir/manikir', 'masaža', 'depilacija','frizura', 'šminka'];
                        var tipoviBoja= [ "#e8bd6e",  "#ee82ee", "#fbdba6", "#e4a199", "#ffb6c1","#db7093"];
                       
                    }
                    if (raspored.value == 1) {
                        var tipoviUsluge= ["šišanje","pedikir/manikir", "masaža", "depilacija"];
                        var tipoviBoja= ["#a58dcd",  "#7667dc", "#32afe7", "#bed7e6"];
                    }
                    let opcija=null;
                    let labela=null;
                    let divRb=null;
                    tipoviUsluge.forEach((mesto,index) =>{
                        divRb=document.createElement("div");
                        opcija=document.createElement("input");
                        opcija.type="radio";
                        divRb.value=mesto;
                        opcija.name=this.naziv1;
                        opcija.value=tipoviBoja[index];
                        divRb.className="usluga";

                        labela=document.createElement("label");
                        labela.innerHTML=mesto;


                        divRb.appendChild(opcija);
                        divRb.appendChild(labela);
                        kontForma.appendChild(divRb);
                                    
                        
                    })

                    var elLabel=document.createElement("label");
                    elLabel.innerHTML="Izaperite termin u rasporedu:";
                    kontForma.appendChild(elLabel);

                    divRb=document.createElement("div");
                    
                    let selX=document.createElement("select");
                    labela=document.createElement("label");
                    
                    labela.innerHTML= " X:  ";
                    
                    divRb.appendChild(labela);
                    divRb.appendChild(selX);

                    for(let i=0; i<this.m; i++)
                    {
                        opcija=document.createElement("option");
                        opcija.innerHTML=i;
                        opcija.value=i;
                        selX.appendChild(opcija);
                    }

                    let selY=document.createElement("select");
                    labela=document.createElement("label");
                    labela.innerHTML= " Y:  ";
                    divRb.appendChild(labela);
                    divRb.appendChild(selY);

                    for(let i=0; i<this.n; i++)
                    {
                        opcija=document.createElement("option");
                        opcija.innerHTML=i;
                        opcija.value=i;
                        selY.appendChild(opcija);
                    }
                    this.crtajTermine(novaForma);
                    kontForma.appendChild(divRb);

                    const dugme=document.createElement("button");
                    dugme.className = "dugme";
                    dugme.innerHTML="Dodaj termin";
                    kontForma.appendChild(dugme);

                    dugme.onclick=(ev)=>
                    {
                        const ime=this.kontejner.querySelector(".ime").value;
                        const kolicina=parseInt(this.kontejner.querySelector(".kolicina").value);
                        const usluga=this.kontejner.querySelector(".usluga").value;
                        const pol = this.kontejner.querySelector(`input[name='${this.naziv1}']:checked`);
                        
                        if (pol == null)
                            alert("Molimo Vas izaberite vrstu usluge");
                        else{
                            let x=parseInt(selX.value);
                            let y=parseInt(selY.value);
                            
                            var pom=this.termini[x*this.n + y].azurirajTerminProba(kolicina, this.maxKapacitet);   
                           
                            if(pom==0)
                            {
                               
                                fetch("https://localhost:5001/FrizerskiSalon/UpisiTermin/" + this.id, {
                                    method: "POST",
                                    mode:'cors',
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        usluga: usluga,
                                        ime: ime,
                                        maxKapacitet: kolicina,
                                        m: x,
                                        n: y,
                                        rezervisan: true
                                    })
                                }).then(p => {
                                    if(p.ok){

                                        this.termini[x*this.n + y].azurirajRezervaciju(1,x,y);
                                        this.termini[x*this.n + y].azurirajTermin(ime,kolicina,pol.value, this.maxKapacitet,pom);
                                        alert("Uspesno ste upisali termin u bazu!");
                                    
                                    }
                                    else if (p.status == 400) {
                                        const greskaTermin = { x: 0, y: 0 };
                                        p.json().then(q => {
                                            greskaTermin.x = q.x;
                                            greskaTermin.y = q.y;
                                            alert("Postoji nepopunjeni termin sa navedenom pozicijom! Termin je (" + greskaTermin.x + "," + greskaTermin.y + ")");
                                        });
                                    }
                                    else {
                                        alert("Greška prilikom upisa u bazu.");
                                    }
                                }).catch(p => {
                                    alert("Greška prilikom upisa u bazu.");
                                });
                            } 
                            else {
                                alert("Greška prilikom upisa u bazu.");
                            }
                        }
                    }
                    kontForma.appendChild(linebreak);

                    divRb=document.createElement("div");
                    
                    let aX=document.createElement("select");
                    labela=document.createElement("label");
                    
                    labela.innerHTML= " X:  ";
                    divRb.appendChild(labela);
                    divRb.appendChild(aX);

                    for(let i=0; i<this.m; i++)
                    {
                        opcija=document.createElement("option");
                        opcija.innerHTML=i;
                        opcija.value=i;
                        aX.appendChild(opcija);
                    }

                    let aY=document.createElement("select");
                    labela=document.createElement("label");
                    labela.innerHTML= " Y:  ";
                    divRb.appendChild(labela);
                    divRb.appendChild(aY);

                    for(let i=0; i<this.n; i++)
                    {
                        opcija=document.createElement("option");
                        opcija.innerHTML=i;
                        opcija.value=i;
                        aY.appendChild(opcija);
                    }
                    kontForma.appendChild(divRb);
                   
                    const dugme2 = document.createElement("button");
                    dugme2.className = "dugme";
                    dugme2.innerHTML = "Obrisi termin";
                    kontForma.appendChild(dugme2);

                    dugme2.onclick = (ev) => {
                        let i=parseInt(aX.value);
                        let j=parseInt(aY.value);
                        if(this.termini[i*this.n + j].rezervisan==1)
                        {
                            fetch("https://localhost:5001/FrizerskiSalon/IzbrisiTermin/"+i+"/"+j+"/"+ this.id,{
                                method: "DELETE"
                            }).then(resp=>{
                                if(resp.ok){
                                    alert("Uspesno ste obrisali!");
                                }
                             }).catch (err=>{
                                  console.log(err);
                             });
                             this.termini[i * this.n + j].obrisiRezervaciju(0,i,j);
                        } 
                        else
                            alert("Ne postoji termin na zadatoj poziciji koju želite obrisati!");
                    }

                    kontForma.appendChild(linebreak);

                    let tretmanForma = document.createElement("div");
                    tretmanForma.className = "tretmanForma";
                    novaForma.appendChild(tretmanForma);
                    
                    tretmanForma.appendChild(linebreak);

                    elLabela=document.createElement("h2");
                    elLabela.innerHTML="O tretmanu";
                    tretmanForma.appendChild(elLabela);

                    this.inicijalnaLista(tretmanForma);

                    elLabela=document.createElement("label");
                    elLabela.innerHTML="Redni broj:";
                    tretmanForma.appendChild(elLabela);

                    tt=document.createElement("input");
                    tt.className="redniBroj";
                    tt.type="number"; 
                    tretmanForma.appendChild(tt);

                    elLabela=document.createElement("label");
                    elLabela.innerHTML="Cena:";
                    tretmanForma.appendChild(elLabela);

                    tt=document.createElement("input");
                    tt.className="cena";
                    tt.type="number"; 
                    tretmanForma.appendChild(tt);

                    elLabela=document.createElement("label");
                    elLabela.innerHTML="Vreme trajanja:";
                    tretmanForma.appendChild(elLabela);

                    tt=document.createElement("input");
                    tt.className="vreme";
                    tt.type="number"; 
                    tretmanForma.appendChild(tt);
                   
                    tretmanForma.appendChild(linebreak);

                    let pomocnaForma = document.createElement("div");
                    pomocnaForma.className = "pomocnaForma";
                    tretmanForma.appendChild(pomocnaForma);

                    divRb=document.createElement("div");
                   
                    tretmanForma.appendChild(divRb);

                    const dugme7 = document.createElement("button");
                    dugme7.className = "dugme";
                    dugme7.innerHTML = "Ažuriraj tretman";
                    tretmanForma.appendChild(dugme7);
                    dugme7.onclick = (ev) => {
                        
                        const redniBr = this.kontejner.querySelector(".redniBroj").value;
                        const cenaa = this.kontejner.querySelector(".cena").value;
                        const vreme = this.kontejner.querySelector(".vreme").value;
                        
                        let x=parseInt(aX.value);
                        let y=parseInt(aY.value);

                       
                        
                        if (redniBr != 0  && cenaa != 0 && vreme != 0) {
                            fetch("https://localhost:5001/FrizerskiSalon/IzmeniTretman", {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({

                                    "redniBroj": redniBr,
                                    "cena": cenaa,
                                    "vremeTrajanja": vreme
                                })
                            }).then(p => {
                                if(p.ok){
                                    
                                    this.termini[x*this.n + y].azurirajTretman(redniBr, cenaa, vreme);
                                }
                                else if(p.status == 406){
                                    alert("Tretman sa zadatim rednim brojem ne postoji");
                                }
                            }).catch (p => {
                                alert("Uspesno ste ažurirali tretman!\r\n"+"Ime: "+ redniBr +"\r\nCena: "+ cenaa +",00 din\r\nVreme: "+vreme + " min");
                                
                            });
                        }
                        else
                            alert("Molimo Vas popunite sve stavke za unos tretmana!");
                    }
                    kontForma.appendChild(linebreak);

                    const dugme6 = document.createElement("button");
                    dugme6.className = "dugme6";
                    dugme6.innerHTML = "Obrisi sve termine";
                    tretmanForma.appendChild(dugme6);
                    
                    dugme6.onclick = (ev) => {
                        fetch("https://localhost:5001/FrizerskiSalon/ObrisiSveTermine" , {
                            method: 'DELETE',
                            mode: 'cors',
                            headers: {
                                "Content-Type": "application/json"
                            },
                        }).then(p => {
                            if (p.ok) {
                                alert("Uspesno ste izbrisali sve termine!");
                                for(let i=0; i<this.m; i++)
                                {
                                    for(let j=0; j<this.n; j++)
                                    {
                                        this.termini[i * this.n + j].obrisiSveRezervacije(0,i,j);
                                    }
                                }
                                
                            }
                            else if (p.status == 406)
                            {
                                alert("Neispravna pozicija igre!")
                            }
                        });
                    }
                }
            }
            else
                alert("Već ste uneli pol za trenutni tretman!");
        }
    }

    vratiPol() {
        return this.kontejner.querySelector(`input[name='${this.naziv}']:checked`).value;
    }

    crtajTermine(host)
    {
        const kontTermina=document.createElement("div");
        kontTermina.className="kontTermina"
        host.appendChild(kontTermina);
        let red;
        let ter;
        for(let i=0; i<this.m; i++)
        {
            red=document.createElement("div");
            red.className="red";
            kontTermina.appendChild(red);
            
            for(let j=0; j<this.n; j++)
            {
                ter=new Termin("","", "", this.kolicina,i,j, 0);
                this.dodajTermin(ter);
                ter.crtajTermin(red);
                
            }
        }
        
    }

    dodajOpcije(imeLab, brojac, host) {
        let opcija = null;
        let deoZaRez = document.createElement("div");
        let selectX = document.createElement("select");
        let labela = document.createElement("label");
        labela.innerHTML = imeLab;
        deoZaRez.appendChild(labela);
        deoZaRez.appendChild(selectX);

        for (let t = 0; t < brojac; t++) {
            opcija = document.createElement("option");
            opcija.innerHTML = t;
            opcija.value = t;
            selectX.appendChild(opcija);
        }

        host.appendChild(deoZaRez);
        return selectX;
    }

    inicijalnaLista(host) 
    {
        const kontTretmana = document.createElement("div");
        kontTretmana.className = "kontTretmana";
        host.appendChild(kontTretmana);
        let por;
        for (let t = 0; t < this.i*this.j; t++) {
            por = new Tretman(t, 0, 0, 0);
            this.dodajTrerman(por);
            por.napisiTretman(kontTretmana);
        }
    }

    dodajTrerman(por) {
        this.tretmani.push(por);
    }

    obrisiTretman(index) {
        this.tretmani = this.tretmani.filter(el => el !== this.tretmani[index]);
    }
}
