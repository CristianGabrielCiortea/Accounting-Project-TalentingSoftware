using AccountingApp.Server.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace AccountingApp.Server.Models.Entities
{
    public class TaskDetails
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int TaskId { get; set; }
        [Required]
        public PaymentType PaymentType { get; set; }
        [Required]
        public DateTime? CompletedDate { get; set; }
        [Required]
        public bool IsCompleted { get; set; } 
        [Required]
        public int WorkedHours { get; set; }
    }
}
