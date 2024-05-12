using CDM_Web_API.Models;
using System;

namespace CDM_Web_API.AccountDTO
{
    public class UpdateAccountDto : BaseAccountDto
    {
        public string PhoneNo { get; set; }
        public string OperatingHours { get; set; }

        public string Manager { get; set; }

        public string ServicesOffered { get; set; }

        public string Expenses { get; set; }

        public string Profit { get; set; }

        public string Revenue { get; set; }

        public string NoOfDept { get; set; }
        public string NoOfEmp { get; set; }
    }
}
