using AccountingApp.Server.Data;
using AccountingApp.Server.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Threading.Tasks;

namespace AccountingApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TasksController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAllTasks()
        {
            var tasks = await _context.Tasks.Include(t => t.TaskDetails).ToListAsync();
            return Ok(tasks);
        }

        [HttpGet("GetAllWithDetails")]
        public async Task<IActionResult> GetAllWithDetails()
        {
            var tasks = await (from p in _context.Projects
                               join o in _context.Tasks on p.Id equals o.ProjectId into taskList
                               from task in taskList.DefaultIfEmpty()
                               join od in _context.TasksDetails on task.Id equals od.TaskId into taskDetailsList
                               from taskDetails in taskDetailsList.DefaultIfEmpty()
                               join e in _context.Employees on taskDetails.EmployeeId equals e.Id into employeeList
                               from emp in employeeList.DefaultIfEmpty()
                               select new
                               {
                                   Project = p,
                                   Employee = emp,
                                   Task = task,
                                   TaskDetails = taskDetails
                               }).ToListAsync();


            return Ok(tasks);
        }

        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetTaskById(int? id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            var task = await _context.Tasks.Include(t => t.TaskDetails)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }

        [HttpGet("GetByName/{name}")]
        public async Task<IActionResult> GetTaskByName(string? name)
        {
            if (name == null)
            {
                return BadRequest();
            }

            var task = await _context.Tasks.Include(t => t.TaskDetails)
                .FirstOrDefaultAsync(m => m.Name == name);

            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Create([FromBody] Models.Entities.Task task)
        {
            if (ModelState.IsValid)
            {
                _context.Add(task);
                await _context.SaveChangesAsync();
                return Ok(task);
            }

            return BadRequest(ModelState);
        }

        [HttpPost("AddDetails")]
        public async Task<IActionResult> AddDetails([FromBody] TaskDetails details)
        {
            if (ModelState.IsValid)
            {
                _context.Add(details);
                await _context.SaveChangesAsync();
            }

            return Ok(details);
        }
    }
}
