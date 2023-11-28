using AccountingApp.Server.Models.Enums;
using Microsoft.Build.Construction;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace AccountingApp.Server.Models.Entities
{
    public class Project
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public PaymentType PaymentType { get; set; } = PaymentType.Hourly;
        [Required]
        public decimal InitialBudget { get; set; } = decimal.Zero;

        public Collection<Task>? Tasks { get; set; }

        [NotMapped]
        public decimal TotalSpent { get; set; } = decimal.Zero;
        [NotMapped]
        public decimal RemainingBudget => InitialBudget - TotalSpent;
        [NotMapped]
        public decimal TotalHours { get; set; } = decimal.Zero;
        [NotMapped]
        public decimal NrOfTasks { get; set; } = decimal.Zero;
    }
}
