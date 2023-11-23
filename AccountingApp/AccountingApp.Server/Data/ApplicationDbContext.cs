using AccountingApp.Server.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Task = AccountingApp.Server.Models.Entities.Task;

namespace AccountingApp.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TaskDetails>()
                .Property(t => t.PaymentType)
                .HasConversion<string>();
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<TaskDetails> TasksDetails { get; set; }
    }
}
