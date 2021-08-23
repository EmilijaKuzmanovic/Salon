

using Microsoft.EntityFrameworkCore;

namespace WEB_projekat.Models
{
    public class FrizerskiSalonContext : DbContext
    {
        public DbSet<Raspored> Rasporedi { get; set; }
        public DbSet<Termin> Termini { get; set; }
        public DbSet<Tretman> Tretmani { get; set; }

        public FrizerskiSalonContext(DbContextOptions options) : base(options)
        {
            
        }       
    }
}