using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WEB_projekat.Models
{
    [Table("Tretman")]
    public class Tretman
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Key]
        [Column("RedniBroj")]
        public int RedniBroj { get; set; }

        [Column("Cena")]
        public int Cena { get; set; }

        [Column("VremeTrajanja")]
        public int VremeTrajanja { get; set; }

        [JsonIgnore]
        public Termin Termin { get; set; }
    }
}