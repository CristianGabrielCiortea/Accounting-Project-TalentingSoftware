using System.ComponentModel.DataAnnotations;

namespace AccountingApp.Server.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public DateTime HiringDate { get; set; }
    }
}
