using AccountingApp.Server.Data;
using AccountingApp.Server.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace AccountingApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProjectsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAllProjects()
        {
            var taskInfos = _context.Tasks
                        .GroupJoin(_context.TasksDetails
                                    .Join(_context.Employees,
                                            det => det.EmployeeId,
                                            e => e.Id,
                                            (det, e) => new
                                            {
                                                det.TaskId,
                                                det.WorkedHours,
                                                IsCompleted = det.IsCompleted == true,
                                                HourlyRate = (double)e.HourlyRate
                                            }
                                          ),
                        t => t.Id,
                        td => td.TaskId,
                        (t, td) => new
                        {
                            t.ProjectId,
                            Task = t,
                            TotalHours = td.Sum(x => x.WorkedHours),
                            TotalSpent = td.Sum(x => x.WorkedHours * x.HourlyRate),
                            NrOfTasks = td.Count(c => c.IsCompleted == true),
                            TotalSpentFixed = t.FixedPrice * td.Count(c => c.IsCompleted == true)
                        }).AsNoTracking();

            var projects = (from project in await _context.Projects.Include(p => p.Tasks).AsNoTracking().ToListAsync()
                            join taskInfo in taskInfos on project.Id equals taskInfo.ProjectId into taskInfoList
                            from taskInfo in taskInfoList.DefaultIfEmpty()
                            group taskInfo by project into g
                            select new Project
                            {
                                Id = g.Key.Id,
                                Name = g.Key.Name,
                                InitialBudget = g.Key.InitialBudget,
                                Tasks = g.Key.Tasks,
                                PaymentType = g.Key.PaymentType,
                                TotalHours = g.Key.PaymentType == Models.Enums.PaymentType.FixedPrice ? 0 : g.Sum(x => x?.TotalHours ?? 0),
                                TotalSpent = g.Key.PaymentType == Models.Enums.PaymentType.FixedPrice ? g.Sum(x => (x?.TotalSpentFixed ?? 0)) : g.Sum(x => (decimal)(x?.TotalSpent ?? 0)),
                                NrOfTasks = g.Key.PaymentType == Models.Enums.PaymentType.Hourly ? 0 : g.Sum(x => x?.NrOfTasks ?? 0)
                            }).ToList();

            return Ok(projects);
        }

        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetProjectById(int? id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            var project = await _context.Projects
                .FirstOrDefaultAsync(m => m.Id == id);

            if (project == null)
            {
                return NotFound();
            }

            return Ok(project);
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Create([FromBody] Project project)
        {
            if (ModelState.IsValid)
            {
                if (project.Id <= 0) project.Id = 0;
                project.Tasks?.ToList().ForEach(c => { if (c.Id <= 0) c.Id = 0; });

                _context.Add(project);
                await _context.SaveChangesAsync();
                return Ok(project);
            }

            return BadRequest(ModelState);
        }

        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            var project = await _context.Projects.Include(c => c.Tasks).FirstOrDefaultAsync(c => c.Id == id);

            if (project == null)
            {
                return NotFound();
            }

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return Ok(project);
        }

        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] Project project)
        {
            if (ModelState.IsValid)
            {
                if (project.Tasks != null)
                {
                    var tasksToRemove = _context.Tasks.Where(c => c.ProjectId == project.Id)
                                            .ToList().ExceptBy(project.Tasks.Select(c => c.Id), t => t.Id).ToList();
                    if (tasksToRemove.Count != 0)
                    {
                        _context.RemoveRange(tasksToRemove);
                        await _context.SaveChangesAsync();
                    }
                }

                project.Tasks?.ToList().ForEach(c =>
                {
                    var extTask = _context.Tasks.FirstOrDefault(t => t.Id == c.Id);
                    if (extTask != null)
                    {
                        extTask.Name = c.Name;
                        extTask.FixedPrice = c.FixedPrice;
                    }
                    else
                    {
                        c.ProjectId = project.Id;
                        if (c.Id <= 0) c.Id = 0;
                        _context.Tasks.Add(c);
                    }
                    _context.SaveChanges();
                });
                project.Tasks?.Clear();

                _context.Update(project);
                await _context.SaveChangesAsync();
                return Ok(project);
            }

            return BadRequest(ModelState);
        }
    }
}
