using System.ComponentModel.DataAnnotations;

namespace AccountingApp.Server.Models.Entities
{
    public class Task
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int ProjectId { get; set; }
        [Required]
        public int EmployeeId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public TaskDetails Details { get; set; }
    }
}
