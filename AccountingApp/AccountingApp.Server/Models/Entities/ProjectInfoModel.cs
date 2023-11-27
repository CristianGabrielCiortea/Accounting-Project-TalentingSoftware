using AccountingApp.Server.Models.Enums;

namespace AccountingApp.Server.Models.Entities
{
    public class ProjectInfoModel
    {
        public int ProjectId { get; set; }
        public string ProjectName { get; set; } = string.Empty;
        public decimal IntialBudget { get; set; }
        public ProjectType ProjectType { get; set; }
        public decimal HoursSpent { get; set; }
        public int CompletedTasks { get; set; }
        public decimal TotalCostSoFar { get; set; }
        public bool OverDue { get; set; }
    }
}
