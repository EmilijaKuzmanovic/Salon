using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WEB_projekat.Models
{
    [Table("Termin")]
    public class Termin
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Usluga")]
        [MaxLength(255)]
        public string Usluga { get; set; }

        [Column("Ime")]
        [MaxLength(255)]
        public string Ime { get; set; }

        [Column("Kapacitet")]
        public int MaxKapacitet { get; set; }

        [Column("M")]
        public int M { get; set; }

        [Column("N")]
        public int N { get; set; }

        [Column("Rezervisan")]
        [DataType("bool")]
        public bool Rezervisan { get; set; }

        [JsonIgnore]
        public Raspored Raspored { get; set; }
        public virtual List<Tretman> Tretmani { get; set; }
    }
}