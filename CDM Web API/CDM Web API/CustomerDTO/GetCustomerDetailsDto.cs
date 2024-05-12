using CDM_Web_API.AccountDTO;
using CDM_Web_API.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CDM_Web_API.CustomerDTO
{
    public class GetCustomerDetailsDto : BaseCustomerDto
    {
        public string Description { get; set; }

        public string PhoneNo { get; set; }

        public string Website { get; set; }

        public string CountryCode { get; set; }
        public virtual IList<DisplayAccountDto> Accounts { get; set; }
    }
}
