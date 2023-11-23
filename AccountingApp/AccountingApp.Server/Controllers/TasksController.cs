using AccountingApp.Server.Data;
using AccountingApp.Server.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            var tasks = await _context.Tasks.Include(t => t.Details).ToListAsync();
            return Ok(tasks);
        }

        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetTaskById(int? id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            var task = await _context.Tasks.Include(t => t.Details)
                .FirstOrDefaultAsync(m => m.Id == id);

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

        //[HttpPost("{taskId}/AddDetails")]
        //public async Task<IActionResult> AddDetails(int taskId, [FromBody] TaskDetails details)
        //{
        //    var task = await _context.Tasks.FirstOrDefaultAsync(t => t.Id == taskId);

        //    if (task == null)
        //    {
        //        return NotFound("Task not found");
        //    }

        //    details.TaskId = taskId;
        //    _context.Add(details);
        //    await _context.SaveChangesAsync();

        //    return Ok(details);
        //}
    }
}
