using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WEB_projekat.Models
{
    [Table("Raspored")]
    public class Raspored
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Naziv")]
        [MaxLength(255)]
        public string Naziv { get; set; }

        [Column("M")]
        public int M { get; set; }

        [Column("N")]
        public int N { get; set; }

        [Column("MaxKapacitet")]
        public int MaxKapacitet { get; set; }


        public virtual List<Termin> Termini { get; set; }
    }
}