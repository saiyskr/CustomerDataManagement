using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CDM_Web_API.Models
{
    public class Account
    {
        [Key]
        public string Email { get; set; }
        public string AccountId { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Location { get; set; }

        [ForeignKey(nameof(Gstin))]
        public string Gstin { get; set; }

        public string AccountName { get; set; }
        

        public string PhoneNo { get; set; }

        public string YearOfEst { get; set; }

        public string OperatingHours { get; set; }

        public string Manager { get; set; }

        public string ServicesOffered { get; set; }

        public string Expenses { get; set; }

        public string Profit { get; set; }

        public string Revenue { get; set; }

        public string NoOfDept { get; set; }
        public string NoOfEmp { get; set; }

        [ForeignKey(nameof(Gstin))]
        public virtual Customer Customer { get; set; }
    }
}