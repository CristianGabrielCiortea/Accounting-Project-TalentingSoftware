using AccountingApp.Server.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace AccountingApp.Server.Models.Entities
{
    public class Project
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        public ProjectType Type { get; set; }
        [Required]
        public decimal InitialBudget { get; set; }
        public ICollection<Task> Tasks { get; set; }
    }
}
