using AccountingApp.Server.Data;
using AccountingApp.Server.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Schema;

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
                    TotalCostSoFar = CalculateTotalCostSoFar(p.Tasks),
                    //OverDue = CalculateOverDue(p.InitialBudget,p.Tasks)
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

        private decimal CalculateTotalCostSoFar(ICollection<Models.Entities.Task> tasks)
        {
            return tasks.Sum(t => t.Price);
        }

        /*private bool CalculateOverDue(decimal intialBudget, ICollection<Models.Entities.Task> tasks)
        {

        }*/
    }
}
