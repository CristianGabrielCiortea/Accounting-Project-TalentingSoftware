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


        [HttpPut("Edit")]
        public async Task<IActionResult> EditTask([FromBody] Models.Entities.Task updatedTask)
        {

            var existingTask = await _context.Tasks.Include(t => t.Details)
                .FirstOrDefaultAsync(m => m.Id == updatedTask.Id);

            if (existingTask == null)
            {
                return NotFound();
            }

            existingTask.EmployeeId = updatedTask.EmployeeId;
            existingTask.Name = updatedTask.Name;

            existingTask.Details.PaymentType = updatedTask.Details.PaymentType;
            existingTask.Details.CompletedDate = updatedTask.Details.CompletedDate;
            existingTask.Details.IsCompleted = updatedTask.Details.IsCompleted;
            existingTask.Details.WorkedHours = updatedTask.Details.WorkedHours;
            existingTask.Details.TotalPrice = updatedTask.Details.TotalPrice;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Tasks.Any(e => e.Id == updatedTask.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(existingTask);
        }
    }
}
