using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CDM_Web_API.Models
{
    public class Customer
    {
        //Primary Key
        [Key]
        public string Gstin { get; set; }

        //Not more than 250 charaters are allowed
        [Column(TypeName = "nvarchar(250)")]
        public string CustomerName { get; set; }

        public string Logo { get; set; }

        public string TypeOfCompany { get; set; }

        public string Description { get; set; }

        [Column(TypeName = "nvarchar(250)")]
        public string Email { get; set; }

        [Column(TypeName = "nvarchar(250)")]
        public string Headquarter { get; set; }

        public string PhoneNo { get; set; }

        [Column(TypeName = "nvarchar(250)")]
        public string Website { get; set; }

        public string CountryCode { get; set; }

        //Each cutomer can have a list of accounts
        public virtual ICollection<Account> Accounts { get; set; }
    }
}