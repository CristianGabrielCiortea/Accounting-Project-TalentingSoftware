using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace AccountingApp.Server.Models.Entities
{
    public class Task
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public int ProjectId { get; set; }
        [ForeignKey("ProjectId")]
        [JsonIgnore]
        public virtual Project? Project { get; set; }

        [Required]
        public string Name { get; set; }
        public decimal FixedPrice { get; set; } = 0;
        public Collection<TaskDetails>? TaskDetails { get; set; }
    }
}