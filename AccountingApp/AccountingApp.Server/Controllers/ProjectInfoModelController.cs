using AccountingApp.Server.Data;
using AccountingApp.Server.Models.Entities;
using AccountingApp.Server.Models.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AccountingApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectInfoModelController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public ProjectInfoModelController(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpGet("{projectId}")]
        public IActionResult GetProjectInfoModel(int projectId)
        {
            var projectInfo = _applicationDbContext.Projects
                .Include(p => p.Employee)
                .Include(p => p.Tasks)
                .ThenInclude(t => t.Details)
                .Where(p => p.Id == projectId)
                .Select(p => new ProjectInfoModel
                {
                    ProjectId = p.Id,
                    ProjectName = p.Name,
                    IntialBudget = p.InitialBudget,
                    ProjectType = p.Type,
                    HoursSpent = CalculateHoursSpent(p.Tasks),
                    CompletedTasks = CalculateCompletedTasks(p.Tasks),
                    TotalCostSoFar = CalculateTotalCostSoFar(p.Employee, p.Tasks),
                    OverDue = CalculateOverDue(p.InitialBudget, p.Tasks, p.Employee)
                })
                .FirstOrDefault();

            if (projectInfo == null)
            {
                return NotFound();
            }

            return Ok(projectInfo);
        }

        private decimal CalculateHoursSpent(ICollection<Models.Entities.Task> tasks)
        {
            return tasks.Sum(t => t.Details.WorkedHours);
        }

        private int CalculateCompletedTasks(ICollection<Models.Entities.Task> tasks)
        {
            return tasks.Count(t => t.Details.IsCompleted);
        }

        private decimal CalculateTotalCostSoFar(Employee employee, ICollection<Models.Entities.Task> tasks)
        {
            decimal totalCostSoFar = 0;

            foreach (var task in tasks)
            {
                if ((task.Details.PaymentType == PaymentType.Fix) && (task.Details.IsCompleted))
                {
                    totalCostSoFar += task.Price;
                }

                if ((task.Details.PaymentType == PaymentType.Hourly) && (!task.Details.IsCompleted))
                {
                    totalCostSoFar += task.Details.WorkedHours * employee.HourlyRate;
                }
            }

            return totalCostSoFar;
        }

        private bool CalculateOverDue(decimal intialBudget, ICollection<Models.Entities.Task> tasks, Employee employee)
        {
            return intialBudget < CalculateTotalCostSoFar(employee, tasks) ? true : false;
        }
    }
}
