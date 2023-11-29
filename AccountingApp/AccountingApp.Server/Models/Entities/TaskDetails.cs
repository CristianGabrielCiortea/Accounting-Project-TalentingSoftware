using AccountingApp.Server.Models.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace AccountingApp.Server.Models.Entities
{
    public class TaskDetails
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public int TaskId { get; set; }

        [ForeignKey("TaskId")]
        [JsonIgnore]
        public virtual Task? Task { get; set; }

        public int EmployeeId { get; set; }
        [Required]
        public DateTime? Date { get; set; }
        [Required]
        public bool IsCompleted { get; set; } = false;
        [Required]
        public int WorkedHours { get; set; } = 0;
    }
}