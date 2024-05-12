using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CDM_Web_API.Models
{
    public class Logs
    {
        [Key]
        public int LogId { get; set; }

        public string AdminName { get; set; }

        [ForeignKey(nameof(Email))]
        public string Email { get; set; }
        public string CustomerName { get; set; }
        public string AccountName { get; set; }
        public string Action { get; set; }
        public string SectionModified { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }

        [ForeignKey(nameof(Email))]
        public virtual Admin Admin { get; set; }
    }
}
