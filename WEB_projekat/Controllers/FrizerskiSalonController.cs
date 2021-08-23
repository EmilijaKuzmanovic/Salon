using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using WEB_projekat.Models;

namespace WEB_projekat.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FrizerskiSalonController : ControllerBase
    {
        public  FrizerskiSalonContext Context { get; set; }

        public FrizerskiSalonController(FrizerskiSalonContext context)
        {
            Context = context;
        }

        [Route("PreuzmiRasporede")]
        [HttpGet]
        public async Task<List<Raspored>> PreuzmiRasporede()
        { 
            return await Context.Rasporedi.ToListAsync();
        }
        [Route("UpisiRaspored")]
        [HttpPost]
        public async Task UpisiRaspored([FromBody] Raspored raspored)
        {
            Context.Rasporedi.Add(raspored);
            await Context.SaveChangesAsync();
        }
        [Route("IzmeniRaspored")]
        [HttpPut]
        public async Task IzmeniRaspored([FromBody] Raspored raspored)
        {
            Context.Update<Raspored>(raspored);
            await Context.SaveChangesAsync();
        }
       


        [Route("IzbrisiRaspored/{id}")]
        [HttpDelete]
        public async Task IzbrisiRaspored(int id)
        {
            var ter=Context.Termini.Where(s=>s.Raspored.ID==id);
            await ter.ForEachAsync(s=>{
                Context.Remove(s);
            });
            var tret=Context.Tretmani.Where(s=>s.Termin.ID==id);
            await tret.ForEachAsync(s=>{
                Context.Remove(s);
            });
            var res = await Context.Rasporedi.FindAsync(id);
            Context.Remove(res);
            await Context.SaveChangesAsync();
        }

        [Route("PreuzmiTermine")]
        [HttpGet]
        public async Task<List<Termin>> PreuzmiTermine()
        { 
            return await Context.Termini.ToListAsync();
        }
        
        [Route("UpisiTermin/{idRaspored}")]
        [HttpPost]
        public async Task UpisiTermin(int idRaspored, [FromBody] Termin termin)
        {
            
            var raspored= await Context.Rasporedi.FindAsync(idRaspored);
            termin.Raspored=raspored;
            Context.Termini.Add(termin);
            await Context.SaveChangesAsync();
        }

        [Route("IzmeniTermin/{id}")]
        [HttpPut]
        public async Task IzmeniTermin(int id)
        {
            var ter = await Context.Termini.FindAsync(id);
            Context.Termini.Update(ter);
            await Context.SaveChangesAsync();
        }


        [Route("ObrisiSveTermine")]
        [HttpDelete]
        public async Task ObrisiSveTermine(){
            
            foreach (var p in Context.Termini)
            {
                Context.Remove(p);
            }
            await Context.SaveChangesAsync();
        }

        [Route("IzbrisiTermin/{id}")]
        [HttpDelete]
        public async Task IzbrisiTermin(int id)
        {
            var tret=Context.Tretmani.Where(s=>s.Termin.ID==id);
            await tret.ForEachAsync(s=>{
                Context.Remove(s);
            });

            var tre = await Context.Termini.FindAsync(id);
            Context.Remove(tre);
            await Context.SaveChangesAsync();
        }

        [Route("IzbrisiTermin/{n}/{m}/{id}")]
        [HttpDelete]
        public async Task IzbrisiTermin(int n, int m, int id)
        {
            var termin=await Context.Termini.Where( s=> s.N==m && s.M==n && s.Raspored.ID==id).FirstOrDefaultAsync();
            Context.Termini.Remove(termin);
            await Context.SaveChangesAsync();
        }




       
        [Route("PreuzmiTretman/{idTermin}")]
        [HttpGet]
        public async Task<List<Tretman>> PreuzmiTretman(int idTermin)
        {
            return await Context.Tretmani.Where(tretman=> tretman.Termin.ID==idTermin).ToListAsync();
        }

        [Route("UpisiTretman/{idTermin}")]
        [HttpPost]
        public async Task UpisiTretman(int idTermin,[FromBody] Tretman tretman)
        {
            var term=await Context.Termini.FindAsync(idTermin);
            tretman.Termin=term;
            Context.Tretmani.Add(tretman);
            await Context.SaveChangesAsync();
        }

        [Route("IzmeniTretman")]
        [HttpPut]
        public async Task IzmeniTretman([FromBody] Tretman tretman)
        {
            Context.Update<Tretman>(tretman);
            await Context.SaveChangesAsync();
        }
        [Route("IzbrisiTretman/{id}")]
        [HttpDelete]
        public async Task IzbrisiTretman(int id)
        {
           var tre = await Context.Tretmani.FindAsync(id);
            Context.Remove(tre);
            await Context.SaveChangesAsync();
        }
   
        


    }
}
