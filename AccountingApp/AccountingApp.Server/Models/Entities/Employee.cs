using System.ComponentModel.DataAnnotations;

namespace AccountingApp.Server.Models.Entities
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public decimal HourlyRate { get; set; }
    }
}
