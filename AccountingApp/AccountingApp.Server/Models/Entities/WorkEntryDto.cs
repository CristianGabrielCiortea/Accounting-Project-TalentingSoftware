namespace AccountingApp.Server.Models.Entities
{
    public class WorkEntryDto
    {
        public DateTime Date { get; set; }
        public int HoursWorked { get; set; }
        public string TaskHourly { get; set; }
        public string TaskSpecial { get; set; }
        public int Payable { get; set; }
    }
}
